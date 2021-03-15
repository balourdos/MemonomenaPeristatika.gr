const crypto = require('crypto')
const videoParser = require('youtube-dl-exec')
const axios = require('axios')
const { S3, config } = require('aws-sdk')
const { PassThrough } = require('stream')

config.loadFromPath('./config.json');
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

const downloadFile = async (fileUrl) => {
    return axios.get(fileUrl, {
        responseType: 'stream',
    })
}

// Returns the location of file
const upload = async (url, fileName) => {
    const responseStream = await downloadFile(url)
    const { passThrough, promise } = uploadFromStream(responseStream, fileName);
    responseStream.data.pipe(passThrough);

    return promise
        .then((result) => {
            return result.Location;
        })
        .catch((e) => {
            throw e;
        });
}

const getVideoURL = async (pageURL) => {
    const { formats: videos } = await videoParser(pageURL, {
        dumpJson: true,
        noWarnings: true,
    })

    // Formats are sorted by resolution asc
    return videos.pop()
}

const hash = str =>  crypto.createHash('md5').update(str).digest("hex");

const main = async (pageURL) => {
    try {
        const {url, ext} = await getVideoURL(pageURL)
        const fileName =  hash(url) + `.${ext}`
        const s3url = await upload(url, fileName)

        return s3url
    }
    catch (e) {
        console.log('Upload failed', pageURL)
        console.error(e)
        return false
    }
}

module.exports = main
