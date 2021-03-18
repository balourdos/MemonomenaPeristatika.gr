const fs = require('fs')
const LOCK_TIMEOUT = 30

const delay = (interval) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, interval)
})

const connect = async () => {
    let lockObtained = false

    for (let i = 0; i < LOCK_TIMEOUT; ++i) {
        // file-based semaphore lock to bypass next.js's unconfigurable multithreaded build process
        // as sqlite does not support simultaneous accesses and causes node to crash with a core dump
        try {
            fs.writeFileSync('./.sqlite.lock', '', { flag: 'wx' })
            console.log('Obtained lock')
            lockObtained = true
            break
        }
        catch (e) {
        }
        await delay(500)
    }
    if (!lockObtained) {
        console.log('Failed to obtain .sqlite.lock. Did you forget to rm .sqlite.lock?')
        return
    }

    const dbFile = '../generator/db.sqlite'
    const db = require('knex')({
        client: 'sqlite',
        connection: {
            filename: dbFile
        },
        pool: { min: 0, max: 1 },
        useNullAsDefault: true
    })

    return db
}

const serve = async db => {
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
        ev.url = `https://videos.memonomenaperistatika.gr/${ev.url}`
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

const serveResult = (async () => {
    const db = await connect()
    const result = serve(db)
    fs.unlinkSync('./.sqlite.lock')
    console.log('Cleaned up lock')
    return result
})()
export default serveResult
