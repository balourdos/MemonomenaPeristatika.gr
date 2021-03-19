const path = require('path')

const db = require('knex')({
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, 'db.sqlite')
    },
    pool: { min: 0, max: 1 },
    useNullAsDefault: true
});

const getEvent = async (id) => {
    const event = await db('event')
        .where({ id })
        .first()

    return event
}

const updateEvent = async (contrib) => {
    await db('event').update({
        page_url: contrib.url,
        description: contrib.description,
        location: contrib.location,
        happened_at: contrib.date,
        posted_at: contrib.contribution_date
    })
    .where({
        id: contrib.id,
    })

    // Unfortunately returning('*') is not supported
    return getEvent(contrib.id)
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

const deleteEvent = async (id) => {
    return db('event')
        .where({ id })
        .del()
}

module.exports = {
    db,
    getEvent,
    deleteEvent,
    createEvent,
    saveVideo,
    updateEvent,
    getVideosByEventID,
}
