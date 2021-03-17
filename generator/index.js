const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const parse = require('csv-parse/lib/sync')
const { uploadVideo, generateThumbnail } = require('./uploader')
const { generateHTML } = require('./generator')
const { saveHTML, config, cache, saveCache } = require('./utils')
const { assert } = require('console')

const COLUMNS = ['contribution_date', 'date', 'location', 'url', 'description', 'status', 'id']
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
        if (typeof cache.videos[contribution.url] !== 'undefined') {
            console.log(`Using cached video URL for ${originalPageURL}`)
            assert(cache.videos[originalPageURL].length > 10)
            contribution.url = cache.videos[originalPageURL]
        }
        else {
            let selfHostedVideoURL
            console.log(`Uploading video ${originalPageURL}...`)
            try {
                selfHostedVideoURL = await uploadVideo(originalPageURL)
            }
            catch {
                console.log(`S3 upload of ${originalPageURL} failed. Check your AWS credentials?`)
                continue
            }
            console.log(`Uploaded to S3: ${originalPageURL}`)
            cache.videos[originalPageURL] = selfHostedVideoURL
            contribution.url = selfHostedVideoURL
        }
        if (typeof cache.thumbnails[originalPageURL] !== 'undefined') {
            if (cache.thumbnails[originalPageURL] === false) {
                console.log(`Thumbnail for ${originalPageURL} is cached as unusable. Skipping.`)
            }
            else {
                console.log(`Using cached thumbnail URL for ${originalPageURL}`)
                assert(cache.thumbnails[originalPageURL].length > 10)
                contribution.thumbURL = cache.thumbnails[originalPageURL]
            }
        }
        else {
            let selfHostedThumbURL
            console.log(`Generating thumbnail for ${originalPageURL}...`)
            try {
                selfHostedThumbURL = await generateThumbnail(originalPageURL)
            }
            catch (e) {
                console.log(`Cloudify upload of ${originalPageURL} failed with status code ${e.http_code}.`)
                if (e.http_code == 400) {
                    console.log(`Assuming excessive video file size. Marking thumbnail as unusable.`)
                    cache.thumbnails[originalPageURL] = false
                    contribution.thumbURL = false
                }
                if (e.http_code == 403 || e.http_code == 401) {
                    console.log(`Check your cloudinary credentials?`)
                }
                continue
            }
            console.log(`Uploaded to cloudify: ${originalPageURL}`)
            cache.thumbnails[originalPageURL] = selfHostedThumbURL
            contribution.thumbURL = selfHostedThumbURL
        }
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
