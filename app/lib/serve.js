const config = require('../../generator/config.json')

const fs = require('fs')

// spinlock to bypass next.js's unconfigurable multithreaded build process
// as sqlite does not support simultaneous accesses and causes node to crashe with a core dump
while (true) {
    try {
        fs.writeFileSync('./.sqlite.lock', '', { flag: 'wx'})
        console.log('Obtained lock')
        break
    }
    catch (e) {
    }
}

const dbFile = '/Users/memonomena/workspace/memonomenaperistatika/MemonomenaPeristatika.gr/generator/db.sqlite'
const db = require('knex')({
    client: 'sqlite',
    connection: {
        filename: dbFile
    },
    pool: { min: 0, max: 1 },
    useNullAsDefault: true
})

const serve = async () => {
    const events = await db('video')
        .select()
        .join('event', 'event.id', '=', 'video.event_id')
        .where('video.url', '>', 10)
        .where({ source: 'local' })

    for (let ev of events) {
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

const servePromise = serve()
export default servePromise

servePromise.then(() => {
    fs.unlinkSync('./.sqlite.lock')
    console.log('Cleaned up lock')
})
