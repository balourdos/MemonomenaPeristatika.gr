const crypto = require('crypto')
const AWSHandler = require('./handlers/aws.js')
const CloudinaryHandler = require('./handlers/cloudinary.js')
const LocalHandler = require('./handlers/local.js')
const videoParser = require('youtube-dl-exec')

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
    let filename

    try {
        const {url, ext} = await getVideoURL(pageURL)
        filename = `${hash(url)}.${ext}`
    }
    catch (e) {
        console.log("URL Generation from sm link failed", pageURL)
        return
    }

    const urls = []

    //TODO: Concurrency
    for (const handler of handlers) {
        const url =  await handler.handle(pageURL, filename)
        console.log(url)
        urls[this.name] = url
    }

    return urls
}


module.exports = { multiUpload }
