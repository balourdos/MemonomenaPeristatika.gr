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

module.exports = {
    loadConfig,
}
