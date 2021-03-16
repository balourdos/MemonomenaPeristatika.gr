const axios = require('axios')
const AWS = require('aws-sdk')
const { S3 } = AWS
const { PassThrough } = require('stream')
const Handler = require('./index')
const { config } = require('../utils')


class AWSHandler extends Handler {
    constructor() {
        super('aws')
        AWS.config.update(config.aws)
        this.bucket = 'memonomenaperistatika.gr'
    }

    uploadFromStream(fileResponse, fileName) {
        const s3 = new S3();
        const passThrough = new PassThrough()
        const promise = s3
            .upload({
                Bucket: this.bucket,
                Key: fileName,
                ContentType: fileResponse.headers['content-type'],
                ContentLength: fileResponse.headers['content-length'],
                Body: passThrough,
                ACL:'public-read'
            })
            .promise()

        return { passThrough, promise }
    }

    async downloadFile(fileUrl) {
        return axios.get(fileUrl, {
            responseType: 'stream',
        })
    }

    async _handle(url, fileName) {
        const responseStream = await this.downloadFile(url)
        const { passThrough, promise } = this.uploadFromStream(responseStream, fileName)
        responseStream.data.pipe(passThrough)

        const result = await promise
        return result.Location
    }
}

module.exports = AWSHandler