const { config, cache } = require('../utils')

class Handler {
    constructor(name) {
        this.name = name
        this.config = config[name]
    }

    getFromCache(url) {
        return cache[this.name][url]
    }

    async handle(url, filename) {
        try {
            const cached = this.getFromCache()
            console.log('cached', cached)

            if (cached) {
                console.log([`[${this.name}] File already uploaded: ${url}`])
                return cached
            }

            if (this.config.enabled) {
                console.log(`[${this.name}] Fetching url`, url)
                return await this._handle(url, filename)
            }

            return null
        }
        catch (e) {
            console.log(`[${this.name}] Upload failed for: ${url}`)
            console.error(e)

            return null
        }
    }

    // Takes video URL and returns self hosted url
    async _handle(url, filename) {
        throw Error("Should be implemented")
    }
}

module.exports = Handler