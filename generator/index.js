const fs = require('fs')
const path = require('path')
const parse = require('csv-parse/lib/sync')
const cheerio = require('cheerio')
const moment = require('moment')
const _ = require('lodash')
const beautifyHTML = require('js-beautify').html

const COLUMNS = ['contribution_date', 'date', 'location', 'url', 'description', 'status']

const CSV = path.join(__dirname, './requests.csv')
const HTML_FILE = path.join(__dirname, '../index.html')

const getContributions = () => {
    const csv = fs.readFileSync(CSV).toString()
    const records = parse(csv, { columns: COLUMNS, from_line: 2 })

    // Deduplicate
    return _.uniqBy(records, 'url')
}

const loadHTML = () => {
    return fs.readFileSync(HTML_FILE).toString()
}

const generateList = (videos) => {
    let list = '<ul>'

    for (const { location, url, description } of videos) {
        list += `<li><a href='${url}' target='_blank'>${location}: ${description}</a></li>`
    }

    return list + '</ul>'
}

const populateWithContent = (contributions) => {
    const $ = cheerio.load(loadHTML())
    const perDate = _.groupBy(contributions, c => moment(c.date, 'MM/DD/YYYY').format('MMM Do YYYY'))

    // Remove existing content
    $('#content *').remove()

    for (const [date, requests] of Object.entries(perDate)) {
        const title = `<h4>${date}</h4>`

        $('#content').append(title)
        $('#content').append(generateList(requests))
    }

    return $.html()
}

const main = () => {
    const contributions = getContributions()
    const html = populateWithContent(contributions)

    console.log(`Generated html file at: ${HTML_FILE}`)
    fs.writeFileSync(beautifyHTML(HTML_FILE), html)
}

main()
