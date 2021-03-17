const axios = require('axios')
const path = require('path')
const fs = require('fs')
const Handler = require('./index')

class LocalHandler extends Handler {
    constructor(config) {
        super('local', config)
    }

    async _handle(url, filename) {
        console.log('[LOCAL] Handling', filename)
        const file = path.join(this.config.videosPath, filename)

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        })

        await response.data.pipe(fs.createWriteStream(file))

        const selfHostURL = path.join(this.config.videosDomain, filename)

        return selfHostURL
    }
}

module.exports = LocalHandler