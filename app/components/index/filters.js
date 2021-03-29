import { useState } from 'react'
import styles from '../../styles/Filters.module.css'

export default function Filters({ entries, setFilters }) {
  const [showFilters, setShowFilters] = useState(false);
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  function clearFilters() {
    setYear('Όλα')
    setLocation('Όλες')
    setSearchTerm('')
    handleFilters('', '', '')
  }
  function toggleShowFilters() {
    clearFilters();
    setShowFilters(!showFilters);
  }

  function handleFilters(filterYear, filterLocation, filterSearchTerm) {
    setFilters(filterYear + ' ' + filterLocation + ' ' + filterSearchTerm)
  }
  const years = [...new Set(entries.map((entry) => entry.title.split(" ")[2]))]
  years.unshift('Όλα')
  let locations = new Set()
  locations.add('Όλες')
  entries.forEach((entry) => {
    entry.videos.forEach((video) => {
      locations.add(video.location.trim())
    })
  })
  locations = [...locations.values()].sort((a, b) => a.localeCompare(b))
  return (
    <div className={ styles.filtersContainer }>
      { showFilters ?
        <>
          <div className={ styles.filter }>
            <label>Έτος</label>
            <select
              id="videoYear"
              type="text"
              placeholder="Όλα"
              value={ year }
              onChange={(e) => { setYear(e.target.value); handleFilters(e.target.value !== 'Όλα' ? e.target.value : '', location !== 'Όλες' ? location : '', searchTerm); }}>
              { years.map(year => <option value={ year }>{ year }</option>) }
            </select>
          </div>
          <div className={ styles.filter }>
            <label>Τοποθεσία</label>
            <select
              id="videoLocation"
              type="text"
              placeholder="Παντού"
              value={ location }
              onChange={(e) => { setLocation(e.target.value); handleFilters(year !== 'Όλα' ? year : '', e.target.value !== 'Όλες' ? e.target.value : '', searchTerm); }}>
              { locations.map(location => <option value={ location }>{ location }</option>) }
            </select>
          </div>
          <div className={ styles.filter }>
            <label>Αναζήτηση</label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Ψάξε για κάποιο περιστατικό"
              name="searchTerm"
              value={ searchTerm }
              onChange={(e) => { setSearchTerm(e.target.value); handleFilters(year !== 'Όλα' ? year : '', location !== 'Όλες' ? location : '', e.target.value); }}
            />
          </div>
          <div className={ styles.cancelFilters }>
            <button onClick={ toggleShowFilters }>
              <svg width="16" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.06078" y1="1.93934" x2="22.274" y2="23.1525" stroke="#888888" strokeWidth="3"/>
                <line x1="22.2739" y1="3.06066" x2="1.06071" y2="24.2739" stroke="#888888" strokeWidth="3"/>
              </svg>
            </button>
          </div>
        </>
      :
        <div>
          <button onClick={ toggleShowFilters }>Φιλτρα + </button>
        </div>
      }
    </div>
  )
}
