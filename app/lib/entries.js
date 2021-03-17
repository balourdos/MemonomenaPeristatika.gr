import fs from 'fs'
import _ from 'lodash'
import parse from 'csv-parse/lib/sync'
import moment from 'moment'
import { assert } from 'console'

const COLUMNS = ['contribution_date', 'date', 'location', 'url', 'description', 'status', 'id']
const CSV = '../entries.csv'
const CACHE = '../generator/self-host-cache'

const loadCache = () => {
  if (!fs.existsSync(CACHE)) {
    return {}
  }
  const cache = JSON.parse(fs.readFileSync(CACHE).toString())
  console.log('Loaded cache from ' + CACHE)
  return cache
}

const cache = loadCache()
const getContributions = () => {
  const csv = fs.readFileSync(CSV).toString()
  const records = parse(csv, { columns: COLUMNS, from_line: 2 }).filter(r => r.status === 'approved')

  // Deduplicate
  const entries = _.uniqBy(records, 'url')

  for (const contribution of entries) {
    const originalPageURL = contribution.url
    if (typeof cache.videos[contribution.url] === 'undefined') {
      console.log(`Video ${originalPageURL} has not been uploaded. Skipping entry completely.`)
      contribution.skip = true
      continue
    }
    console.log(`Using cached video URL for ${originalPageURL}`)
    assert(cache.videos[originalPageURL].length > 10)
    contribution.url = cache.videos[originalPageURL]

    if (typeof cache.thumbnails[originalPageURL] === 'undefined') {
      console.log(`Thumbnail for ${originalPageURL} has not been uploaded. Skipping thumbnail.`)
      contribution.thumbURL = false
      continue
    }
    if (cache.thumbnails[originalPageURL] === false) {
      console.log(`Thumbnail for ${originalPageURL} is cached as unusable. Skipping thumbnail.`)
      contribution.thumbURL = false
      continue
    }
    console.log(`Using cached thumbnail URL for ${originalPageURL}`)
    assert(cache.thumbnails[originalPageURL].length > 10)
    contribution.thumbURL = cache.thumbnails[originalPageURL]
  }

  return entries
}

export const getEntries = async () => {
  let contribs = getContributions()
  contribs = contribs.filter(c => c.url !== false)

  const perDate = _.groupBy(contribs, c => moment(c.date, 'MM/DD/YYYY').format('YYYY-MM-DD'))
  const sorter = ([dateL, _], [dateR, __]) => moment(dateR).diff(moment(dateL), 'minutes')

  const entries = Object.entries(perDate)
    .sort(sorter)
    .map(([date, videos]) => ({
      title: moment(date).locale('el').format('LL'),
      videos
    }))

  return entries
}
