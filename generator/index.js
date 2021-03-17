const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const parse = require('csv-parse/lib/sync')
const { getVideoFromSM, getVideoFilename } = require('./uploader')
const { loadConfig } = require('./utils')
const { getEvent, setStatus, saveVideo, createEvent, getVideosByEventID } = require('./db')

const COLUMNS = ['contribution_date', 'date', 'location', 'url', 'description', 'status', 'id']
const CSV = path.join(__dirname, '../entries.csv')
const config = loadConfig()

const loadActiveHandlers = () => {
    const handlers = []
    const hosts = Object.keys(config.hosts)

    for (const host of hosts) {
        const hostConfig = config.hosts[host]

        if (hostConfig.enabled) {
            const handler = require(`./handlers/${host}`)
            handlers.push(new handler(hostConfig))
        }
    }

    return handlers
}

const getContributions = () => {
    const csv = fs.readFileSync(CSV).toString()
    const records = parse(csv, { columns: COLUMNS, from_line: 2 })

    // Deduplicate
    const entries = _.uniqBy(records, 'url')
    console.log(`Retrieved ${entries.length} entries`)

    return entries
}

const populateDatabase = async contribs => {
    const handlers = loadActiveHandlers()

    for (const contrib of contribs) {
        const pageURL = contrib.url
        let event = await getEvent(+contrib.id)

        if (!event) {
            console.log(`Event ${pageURL} does't exist in the database. Adding it`)
            event = await createEvent(contrib)
        }

        if (contrib.status != 'approved') {
            console.log(`Event ${pageURL} is not approved. Flagging in the database`)
            await setStatus(contrib.id, contrib.status)
            break
        }

        const hostedVideos = await getVideosByEventID(contrib.id)
        const sources = hostedVideos.map(t => t.source)
        let video

        for (handler of handlers) {
            if (sources.includes(handler.name)) {
                // console.log(`Video ${pageURL} already uploaded on ${handler.name}`)
                continue
            }
            console.log(`Video ${pageURL} is not uploaded on ${handler.name}. Uploading it`)

            video = video ? video : await getVideoFromSM(pageURL)
            if (!video) {
                console.log("URL Generation from social media link failed", pageURL)
                break
            }

            const filename = getVideoFilename(pageURL, video)
            const selfHostedURL = await handler.handle(video.url, filename)

            if (!selfHostedURL) { 
                console.log(`Video handle failed on ${handler.name}, ${pageURL}`)
            }
            console.log('Video was handled successfully and stored at ', selfHostedURL)
            await saveVideo({event_id: contrib.id, source: handler.name, url: selfHostedURL})
        }
    }

    return contribs
}

const main = async () => {
    let contribs = getContributions()
    await populateDatabase(contribs)

    console.log(`Database was successfuly updated`)
}

main()
