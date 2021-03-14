const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const parse = require('csv-parse/lib/sync')
const upload = require('./uploader')
const { generateHTML } = require('./generator')
const { saveHTML, config } = require('./utils')

const COLUMNS = ['contribution_date', 'date', 'location', 'url', 'description', 'status']
const CSV = path.join(__dirname, './entries.csv')

const getContributions = () => {
    const csv = fs.readFileSync(CSV).toString()
    const records = parse(csv, { columns: COLUMNS, from_line: 2 }).filter(r => r.status === 'approved')

    // Deduplicate
    return _.uniqBy(records, 'url')
}

const uploadContributions = async (contribs) => {
    // Uploads cannot be done concurrently in Cloudinary free plan
    for (contribution of contribs) {
        const cloudinaryUrl = await upload(contribution.url)
        console.log(`Uploaded to cloudinary: ${contribution.url}`)
        contribution.url = cloudinaryUrl
    }

    return contribs
}

const main = async () => {
    const { cloudinary } = config
    let contribs = getContributions()

    if (cloudinary.enabled) {
        contribs = await uploadContributions(contribs)
    }

    const validContributions = contribs.filter(c => c.url != false)
    const html = generateHTML(validContributions)

    saveHTML(html)
    console.log(`Generated HTML`)
}

main()
