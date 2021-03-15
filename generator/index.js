const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const parse = require('csv-parse/lib/sync')
const upload = require('./uploader')
const { generateHTML } = require('./generator')
const { saveHTML, config, cache, saveCache } = require('./utils')

const COLUMNS = ['contribution_date', 'date', 'location', 'url', 'description', 'status', '_', '_']
const CSV = path.join(__dirname, '../entries.csv')

const getContributions = () => {
    const csv = fs.readFileSync(CSV).toString()
    const records = parse(csv, { columns: COLUMNS, from_line: 2 }).filter(r => r.status === 'approved')

    // Deduplicate
    const entries = _.uniqBy(records, 'url')
    console.log(`Retrieved ${entries.length} entries`)
    return entries
}

const uploadContributions = async contribs => {
    console.log('Uploading content to S3')
    for (contribution of contribs) {
        if (typeof cache[contribution.url] !== 'undefined') {
            console.log('Using cached URL for ' + contribution.url)
            contribution.url = cache[contribution.url]
            continue
        }
        const selfHostedURL = await upload(contribution.url)
        console.log(`Uploaded to S3: ${contribution.url}`)
        cache[contribution.url] = selfHostedURL
        contribution.url = selfHostedURL
    }
    console.log('Updating the cache')
    saveCache(cache)

    return contribs
}

const main = async () => {
    let contribs = getContributions()
    contribs = await uploadContributions(contribs)

    const validContributions = contribs.filter(c => c.url != false)
    const html = generateHTML(validContributions)

    saveHTML(html)
    console.log(`Generated HTML at ${config.htmlfile}`)
}

main()
