const crypto = require('crypto')
const videoParser = require('youtube-dl-exec')
const axios = require('axios')
const AWS = require('aws-sdk')
const { S3 } = AWS
const { PassThrough } = require('stream')
const { config } = require('./utils')
const { promisify } = require('util')
const { v2: CloudinaryClient } = require('cloudinary')

AWS.config.update(config.aws)
const bucket = 'memonomenaperistatika.gr'

const uploadFromStream = (fileResponse, fileName) => {
    const s3 = new S3();
    const passThrough = new PassThrough()
    const promise = s3
        .upload({
            Bucket: bucket,
            Key: fileName,
            ContentType: fileResponse.headers['content-type'],
            ContentLength: fileResponse.headers['content-length'],
            Body: passThrough,
            ACL:'public-read'
        })
        .promise()

    return { passThrough, promise }
}

const downloadFile = async fileUrl => {
    return axios.get(fileUrl, {
        responseType: 'stream',
    })
}

// Returns the location of file
const s3upload = async (url, fileName) => {
    const responseStream = await downloadFile(url)
    const { passThrough, promise } = uploadFromStream(responseStream, fileName)
    responseStream.data.pipe(passThrough)

    const result = await promise
    return result.Location
}

const getVideoURL = async pageURL => {
    const { formats: videos } = await videoParser(pageURL, {
        dumpJson: true,
        noWarnings: true,
    })

    // Formats are sorted by resolution asc
    return videos.pop()
}

const createCloudinaryClient = () => {
    const { cloudinary } = config

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

const hash = str => crypto.createHash('md5').update(str).digest('hex')

const uploadVideo = async pageURL => {
    try {
        const {url, ext} = await getVideoURL(pageURL)
        const fileName = hash(url) + `.${ext}`
        const s3url = await s3upload(url, fileName)

        return s3url
    }
    catch (e) {
        console.log('Upload failed', pageURL)
        console.error(e)
        throw e
    }
}

const generateThumbnail = async pageURL => {
    try {
        const videoURL = (await getVideoURL(pageURL)).url
        const res = await cloudinaryUpload(videoURL, hash(pageURL))

        const cloudinaryURL = res.secure_url

        const thumbURL = cloudinaryURL.substr(0, cloudinaryURL.lastIndexOf('.')) + '.jpg'
        return thumbURL
    }
    catch (e) {
        console.log('Upload failed', pageURL)
        console.error(e)
        throw e
    }
}

module.exports = { uploadVideo, generateThumbnail }
