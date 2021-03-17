const crypto = require('crypto')
const videoParser = require('youtube-dl-exec')

// @param video youtube_dl format
const getVideoFilename = (pageURL, video) => {
    const hash = crypto.createHash('md5').update(pageURL).digest('hex')
    const filename = `${hash}.${video.ext}`

    return filename
}

const getVideoFromSM = async pageURL => {
    try {
        const { formats: videos } = await videoParser(pageURL, {
            dumpJson: true,
            noWarnings: true,
        })

        return videos.pop()
    }
    catch (e) {
        return null
    }
}

module.exports = { getVideoFilename, getVideoFromSM }