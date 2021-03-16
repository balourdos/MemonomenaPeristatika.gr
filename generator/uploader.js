const crypto = require('crypto')
const AWSHandler = require('./handlers/aws.js')
const CloudinaryHandler = require('./handlers/cloudinary.js')
const LocalHandler = require('./handlers/local.js')
const videoParser = require('youtube-dl-exec')
const { parse } = require('url')

const handlers = [new CloudinaryHandler(), new LocalHandler(), new AWSHandler()]

const hash = str => crypto.createHash('md5').update(str).digest('hex')

const getVideoURL = async pageURL => {
    const { formats: videos } = await videoParser(pageURL, {
        dumpJson: true,
        noWarnings: true,
    })

    // Formats are sorted by resolution asc
    return videos.pop()
}

const multiUpload = async pageURL => {
    let parsedVideo 
    console.log("Multi-uploading", pageURL)

    try {
        parsedVideo = await getVideoURL(pageURL)
    }
    catch (e) {
        console.log("URL Generation from sm link failed", pageURL)
        return
    }

    const {url, ext} = parsedVideo
    filename = `${hash(url)}.${ext}`
    const urls = []

    //TODO: Concurrency
    for (const handler of handlers) {
        const selfHostedURL =  await handler.handle(pageURL, url, filename)
        urls[handler.name] = selfHostedURL
    }

    return urls
}


module.exports = { multiUpload }
