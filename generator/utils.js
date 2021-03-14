const path = require('path')
const fs = require('fs')

const HTML_FILE = path.join(__dirname, '../index.html')

const loadHTML = () => fs.readFileSync(HTML_FILE).toString()
const saveHTML = html => fs.writeFileSync(HTML_FILE, html)

const loadConfig = () => {
    const configPath = path.join(__dirname, './config.json')

    if (!fs.existsSync(configPath)) {
        throw Error('Create config.json from config.json.template')
    }

    return require(configPath)
}

module.exports = {
    loadHTML,
    saveHTML,
    loadConfig
}