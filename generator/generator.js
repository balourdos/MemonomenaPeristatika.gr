const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const _ = require('lodash')
const beautifyHTML = require('js-beautify').html
const { loadHTML } = require('./utils')
const ejs = require('ejs')

const generateHTML = contributions => {
    const $ = cheerio.load(loadHTML())
    const perDate = _.groupBy(contributions, c => moment(c.date, 'MM/DD/YYYY').format('YYYY-MM-DD'))
    const sorter = ([dateL, _], [dateR, __]) => moment(dateR).diff(moment(dateL), 'minutes')

    // Remove existing content
    $('#content *').remove()

    const entries = Object.entries(perDate)
        .sort(sorter)
        .map(([date, videos]) => ({
            title: moment(date).locale('el').format('LL'),
            videos
        }))

    const HTML = ejs.render(fs.readFileSync(path.join(__dirname, 'page.ejs')).toString(), {entries})

    $('#content').append(HTML)

    return beautifyHTML($.html())
}

module.exports = {
    generateHTML
}
