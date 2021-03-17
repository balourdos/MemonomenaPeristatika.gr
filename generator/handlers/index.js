class Handler {
    constructor(name, config) {
        this.name = name
        this.config = config
    }

    async handle(url, filename) {
        try {
            return await this._handle(url, filename)
        }
        catch (e) {
            console.log(`[${this.name}] Upload failed`)
            console.log(e)

            return null
        }
    }

    // Takes video URL and returns self hosted url
    async _handle(url, filename) {
        throw Error("Should be implemented")
    }
}

module.exports = Handler