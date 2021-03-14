const cheerio = require('cheerio')
const path = require('path')
const moment = require('moment')
const _ = require('lodash')
const beautifyHTML = require('js-beautify').html
const { loadHTML } = require('./utils')

const generateList = (videos) => {
    let list = '<ul>\n'

    for (const { location, url, description } of videos) {
        list += `<li>${location}${location ? ':' : ''} <a href='${url}' target='_blank'>${description}</a></li>\n`
    }

    return list + '</ul>\n'
}

const generateHTML = (contributions) => {
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

    return beautifyHTML($.html())
}

module.exports = {
    generateHTML
}