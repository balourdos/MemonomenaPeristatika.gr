const { db } = require('./db')
const { loadConfig } = require('./utils')

const config = loadConfig()

const serve = async () => {
    const events = await db('video')
        .select()
        .join('event', 'event.id', '=', 'video.event_id')
        .where('video.url', '>', 10)
        .where({ source: 'local' })

    for (ev of events) {
        const { url } = await db('video').select('url')
            .where({
                source: 'cloudinary',
                event_id: ev.id
            })
            .first()

        // TODO Rewrite that using a url library
        ev.url = config.hosts.local.videosDomain + '/' + ev.url
        ev.thumbnail = genThumbFromCloudinary(url)
        ev.happened_at = new Date(ev.happened_at).toISOString()

        delete ev.posted_at
        delete ev.id
    }

    return events

}

const genThumbFromCloudinary = cloudinaryURL => {
    return cloudinaryURL ?
        cloudinaryURL.substr(0, cloudinaryURL.lastIndexOf('.')) + '.jpg' :
        false
}

module.exports = serve