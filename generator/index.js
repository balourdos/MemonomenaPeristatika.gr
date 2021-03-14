const fs = require('fs')
const path = require('path')
const parse = require('csv-parse/lib/sync')
const cheerio = require('cheerio')
const moment = require('moment')
const _ = require('lodash')
const beautifyHTML = require('js-beautify').html

const COLUMNS = ['contribution_date', 'date', 'location', 'url', 'description', 'status']

const CSV = path.join(__dirname, '../entries.csv')
const HTML_FILE = path.join(__dirname, '../index.html')

const getContributions = () => {
    const csv = fs.readFileSync(CSV).toString()
    const records = parse(csv, { columns: COLUMNS, from_line: 2 }).filter((r) => r.status === 'approved')

    // Deduplicate
    return _.uniqBy(records, 'url')
}

const loadHTML = () => {
    return fs.readFileSync(HTML_FILE).toString()
}

const generateList = (videos) => {
    let list = '<ul>\n'

    for (const { location, url, description } of videos) {
        list += `<li>${location}${location ? ':' : ''} <a href='${url}' target='_blank'>${description}</a></li>\n`
    }

    return list + '</ul>\n'
}

const populateWithContent = (contributions) => {
    const $ = cheerio.load(loadHTML())
    const perDate = _.groupBy(contributions, c => moment(c.date, 'MM/DD/YYYY').format('YYYY-MM-DD'))
    const sorter = ([dateL, _], [dateR, __]) => moment(dateR).diff(moment(dateL), 'minutes')

    // Remove existing content
    $('#content *').remove()

    for (const [date, requests] of Object.entries(perDate).sort(sorter)) {
        const title = `\n<h4>${moment(date).locale('el').format('LL')}</h4>\n`

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
