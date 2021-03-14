const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const parse = require('csv-parse/lib/sync')
const upload = require('./uploader')
const { generateHTML } = require('./generator')
const { saveHTML } = require('./utils')

const COLUMNS = ['contribution_date', 'date', 'location', 'url', 'description', 'status']
const CSV = path.join(__dirname, './entries.csv')

const getContributions = () => {
    const csv = fs.readFileSync(CSV).toString()
    const records = parse(csv, { columns: COLUMNS, from_line: 2 }).filter((r) => r.status === 'approved')

    // Deduplicate
    return _.uniqBy(records, 'url')
}

const main = async () => {
    const contribs = getContributions()

    // Uploads cannot be done concurrently in Cloudinary free plan
    for (contribution of contribs) {
        const cloudinaryUrl = await upload(contribution.url)
        console.log(`Uploaded to cloudinary: ${contribution.url}`)
        contribution.url = cloudinaryUrl
    }

    const validContributions = contribs.filter(c => c.url != false)
    const html = generateHTML(validContributions)

    saveHTML(html)
    console.log(`Generated HTML`)
}

main()