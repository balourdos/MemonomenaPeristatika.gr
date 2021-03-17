const path = require('path')
const fs = require('fs')

const CONFIG_FILE = 'config.json'

const loadConfig = () => {
    const configPath = path.join(__dirname, CONFIG_FILE)

    if (!fs.existsSync(configPath)) {
        throw Error('Create config.json from config.json.template')
    }

    return require(configPath)
}

const genThumbFromCloudinary = async cloudinaryURL => {
    if (!cloudinaryURL) {
        return false
    }

    return cloudinaryURL.substr(0, cloudinaryURL.lastIndexOf('.')) + '.jpg'
}

module.exports = {
    genThumbFromCloudinary,
    loadConfig,
}
