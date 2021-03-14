const path = require('path')
const crypto = require('crypto')
const { promisify } = require('util')
const { v2: CloudinaryClient } = require('cloudinary')
const videoParser = require('youtube-dl-exec')
const { loadConfig } = require('./utils')

const createCloudinaryClient = () => {
    const { cloudinary } = loadConfig()

    CloudinaryClient.config({
            cloud_name: cloudinary.name,
            api_key: cloudinary.key,
            api_secret: cloudinary.secret,
    })

    return CloudinaryClient
}

const cloudinaryUpload = (data, publicId) => {
    const cloudinaryClient = createCloudinaryClient()

    const _upload = promisify((data, opts, cb) =>
        cloudinaryClient.uploader.upload(data, opts, cb),
    )

    return _upload(data, {
            resource_type: 'auto',
            use_filename: true,
            timeout: 60000,
            unique_filename: false,
            public_id: publicId,
    })
}

const getVideoURL = async (pageURL) => {
    const { formats: videos } = await videoParser(pageURL, {
        dumpJson: true,
        noWarnings: true,
    })

    // Formats are sorted by resolution asc 
    return videos.pop().url
}

const hash = str =>  crypto.createHash('md5').update(str).digest("hex");

const main = async (pageURL) => {
    try {
        const videoURL = await getVideoURL(pageURL)
        const res = await cloudinaryUpload(videoURL, hash(pageURL))

        return res.secure_url
    }
    catch (e) {
        console.log('Upload failed', pageURL)
        console.error(e)
        return false
    }
}

module.exports = main
