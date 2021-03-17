const { v2: CloudinaryClient } = require('cloudinary')
const { promisify } = require('util')
const Handler = require('./index')

class CloudinaryHandler extends Handler {
    constructor(config) {
        super('cloudinary', config)
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
        CloudinaryClient.uploader.upload(data, opts, cb),
    )

    async _handle(url, filename) {
        console.log('URL', url)
        const { secure_url } = await this.upload(url, {
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