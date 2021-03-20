import _ from 'lodash'
import moment from 'moment'
import serveResult from './serve'

const humanDate = date => {
  return moment(date).locale('el').format('LL')
}

export const getEvents = async () => {
  const events = await serveResult

  for (const event of events) {
    event.humanDate = humanDate(event.happened_at)
  }

  return events
}

export const getEntries = async () => {
  console.log('getEntries')
  let events = await getEvents()

  const perDate = _.groupBy(events, c => moment(c.happened_at).format('YYYY-MM-DD'))
  const sorter = ([dateL, _], [dateR, __]) => moment(dateR).diff(moment(dateL), 'minutes')

  const entries = Object.entries(perDate)
    .sort(sorter)
    .map(([date, videos]) => ({
      title: humanDate(date),
      videos
    }))

  return entries
}

// export const entries = getEntries()
// export const contributions = getEvents()
