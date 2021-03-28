import { useState } from 'react'
import Head from 'next/head'
import { getEntries } from '../lib/entries'
import Entry from '../components/index/entry'
import Layout from '../components/layout'
import Filters from '../components/index/filters'

export default function HomePage({ entries }) {
  const [filters, setFilters] = useState('')

  let filteredEntries = filters !== '' ? entries.map(entry => {
    return {
      title: entry.title,
      videos: entry.videos.filter((video) => {
        let searchable = entry.title + ' ' + video.description + ' ' + video.location + ' ' + video.happened_at + ' ' + video.humanDate;
        let searchTerms = filters.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');
        return searchTerms.every(term => {
            return searchable.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term);
        });
      })
    }
  }).filter(entry => entry.videos.length > 0) : entries

  return (
    <Layout>
      <Head>
        <title>Μεμονωμένα Περιστατικά</title>
        <meta property="og:locale" content="el_GR" />
        <meta property="og:title" content="Μεμονωμένα Περιστατικά" />
        <meta property="og:description" content="Αστυνομική βία, αυθαιρεσία και κατάχρηση εξουσίας" />
        <meta property="og:image" content="https://memonomenaperistatika.gr/social-header.jpg?v=1" />
        <meta property="og:url" content="https://memonomenaperistatika.gr" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Μεμονωμένα Περιστατικά" />
        <meta name="twitter:title" content="Μεμονωμένα Περιστατικά" />
        <meta name="twitter:description" content="Αστυνομική βία, αυθαιρεσία και κατάχρηση εξουσίας" />
        <meta name="twitter:image" content="https://memonomenaperistatika.gr/social-header.jpg?v=1" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <h1><em>{ entries.reduce((acc, entry) => acc + entry.videos.length, 0) }</em> Μεμονωμένα Περιστατικά</h1>
      <h3>Αστυνομικής <em>βίας</em> και <em>κατάχρησης</em> εξουσίας</h3>

      <nav>
        <a href="https://forms.gle/cNgRuEyUQWDPr4rr8" className="button button-primary" target="_blank">Αναφορα Περιστατικου</a>
        <a href="https://twitter.com/peristatika" className="button button-secondary" target="_blank">Twitter</a>
      </nav>

      <section id="content">
        <Filters
          entries={ entries }
          setFilters={ (fitlers) => setFilters(fitlers)}
        />
        { filteredEntries.length === 0 && <div className="alert">Δεν βρέθηκαν αποτελέσματα για την αναζήτηση σας.</div> }
        {
          filteredEntries.length > 0 ? filteredEntries.map(
            entry => entry.videos.length > 0 && <Entry entry={entry} key={entry.title} />
          ) : entries.map(
            entry => entry.videos.length > 0 && <Entry entry={entry} key={entry.title} />
          )
        }
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const entries = await getEntries()

  return {
    props: { entries }
  }
}
