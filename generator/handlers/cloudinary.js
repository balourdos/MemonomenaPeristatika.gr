const { v2: CloudinaryClient } = require('cloudinary')
const { promisify } = require('util')
const Handler = require('./index')

class CloudinaryHandler extends Handler {
    constructor() {
        super('cloudinary')
    }

    getClient() {
        CloudinaryClient.config({
                cloud_name: this.config.name,
                api_key: this.config.key,
                api_secret: this.config.secret,
        })

        return CloudinaryClient
    }

    upload = promisify((data, opts, cb) =>
        cloudinaryClient.uploader.upload(data, opts, cb),
    )

    async _handle(url, filename) {
        const { secure_url } = await upload(url, {
            resource_type: 'auto',
            use_filename: true,
            timeout: 60000,
            unique_filename: false,
            public_id: filename,
        })

        return secure_url
    }
}

module.exports = CloudinaryHandler