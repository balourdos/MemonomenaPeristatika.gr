const path = require('path')
const fs = require('fs')

const CONFIG_FILE = 'config.json'

console.log(`Using config file ${CONFIG_FILE}`)
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

// set some config defaults
const config = loadConfig()
if (typeof config.htmlfile === 'undefined') {
    config.htmlfile = '../index.html'
}
config.htmlfile = path.join(__dirname, config.htmlfile)
if (typeof config.cachefile === 'undefined') {
    config.cachefile = 'cache.json'
}
config.cachefile = path.join(__dirname, config.cachefile)
if (typeof config.templatefolder === 'undefined') {
    config.templatefolder = '../templates'
}
config.templatefolder = path.join(__dirname, config.templatefolder)
const loadCache = () => {
    if (!fs.existsSync(config.cachefile)) {
        return {}
    }
    const cache = JSON.parse(fs.readFileSync(config.cachefile).toString())
    console.log('Loaded cache from ' + config.cachefile)
    return cache
}
const cache = loadCache()

const saveCache = cache => {
    fs.writeFileSync(config.cachefile, JSON.stringify(cache, null, 4))
}

const saveHTML = html => fs.writeFileSync(config.htmlfile, html)

module.exports = {
    genThumbFromCloudinary,
    saveHTML,
    cache,
    saveCache,
    config,
}
