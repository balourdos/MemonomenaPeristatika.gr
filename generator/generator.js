const path = require('path')
const fs = require('fs')
const moment = require('moment')
const _ = require('lodash')
const { config } = require('./utils')
const ejs = require('ejs')

const generateHTML = contributions => {
    const perDate = _.groupBy(contributions, c => moment(c.date, 'MM/DD/YYYY').format('YYYY-MM-DD'))
    const sorter = ([dateL, _], [dateR, __]) => moment(dateR).diff(moment(dateL), 'minutes')
    const entryCount = contributions.length

    const entries = Object.entries(perDate)
        .sort(sorter)
        .map(([date, videos]) => ({
            title: moment(date).locale('el').format('LL'),
            videos: videos.map(video => ({
                thumburl: video.url.substr(0, video.url.lastIndexOf('.')) + '.jpg',
                ...video
            }))
        }))

    const HTML = ejs.render(fs.readFileSync(path.join(config.templatefolder, 'page.ejs')).toString(), {entryCount, entries})

    return HTML
}

module.exports = {
    generateHTML
}
