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
// set some config defaults
const config = loadConfig()
if (typeof config.htmlfile === 'undefined') {
    config.htmlfile = '../index.html'
}
config.htmlfile = path.join(__dirname, config.htmlfile)
const loadHTML = () => fs.readFileSync(config['htmlfile']).toString()
const saveHTML = html => fs.writeFileSync(config['htmlfile'], html)

module.exports = {
    loadHTML,
    saveHTML,
    config
}
