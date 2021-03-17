// Script which generates basic SQL Schema
const db = require('../db')

Promise.all([
    db.schema.createTable('event', (table) => {
        table.increments('id').primary()
        table.string('description')
        table.string('location')
        table.datetime('posted_at')
        table.date('happened_at')
    }),
    db.schema.createTable('video', (table) => {
        table.increments('id').primary()
        table.integer('event_id')
        table.string('source') // cloudinary, aws, local
        table.string('url')

        table.foreign('event_id').references('event;').inTable('id')
    })
])
.then(console.log('Basic schema was created'))