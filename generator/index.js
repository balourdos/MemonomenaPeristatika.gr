const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const parse = require('csv-parse/lib/sync')
const { multiUpload, generateThumbnail } = require('./uploader')
const { generateHTML } = require('./generator')
const { saveHTML, config, cache, saveCache, genThumbFromCloudinary } = require('./utils')

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
        const originalPageURL = contribution.url
        const {aws: awsURL, cloudinary: cloudinaryURL, local: localURL } = await multiUpload(originalPageURL)
        
        contribution.thumbURL = genThumbFromCloudinary(cloudinaryURL)
        contribution.url = localURL

        // TODO: Rewrite that
        cache['cloudinary'][originalPageURL] = cloudinaryURL
        cache['aws'][originalPageURL] = awsURL
        cache['local'][originalPageURL] = localURL
        saveCache(cache)
    }

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
