const db = require('knex')({
    client: 'sqlite',
    connection: {
      filename: './db.sqlite'
    },
    useNullAsDefault: true
});

const getEvent = async (id) => {
    const event = await db('event')
        .where({ id })
        .first()

    return event
}

const createEvent = async (contrib) => {
    await db('event').insert({
        id: contrib.id,
        page_url: contrib.url,
        description: contrib.description,
        location: contrib.location,
        happened_at: contrib.date,
        posted_at: contrib.contribution_date
    })

    // Unfortunately returning('*') is not supported
    return getEvent(contrib.id)
}

const saveVideo = async (video) => {
    return db('video').insert(video)
}

const getVideosByEventID = async (event_id) => {
    return db('video').where({ event_id })
}

// Basic function called by the app to generate the HTML
const getAllEvents = async (source = 'local') => {
    return db('video')
        .select()
        .join('event', 'event.id', '=', 'video.event_id')
        .where('event.url', '>', 10)
        .where('event.status', 'approved')
        .where({ source })
}

const setStatus = async (id, status) => {
    return db('event')
        .update({ status })
        .where({ id })
}

module.exports = {
    db,
    getEvent,
    setStatus,
    createEvent,
    saveVideo,
    getVideosByEventID,
    getAllEvents
}