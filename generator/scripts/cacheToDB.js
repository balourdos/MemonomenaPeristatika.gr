const { db } = require('../db')
const cache = require('../cache.json')

const main = async () => {
    const event = await db('event')

    for (const { page_url, id } of event) {
        console.log(id, page_url)
        for (const host of ['aws', 'cloudinary']) {
            const video = cache[host][page_url]
            if (video) {
                console.log('Cache has', host, page_url, video)
                await db('video').insert({event_id: id, source: host, url: video})
            }
        }
    }
}

main()