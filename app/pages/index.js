import Head from 'next/head'
import { getEntries } from '../lib/entries'
import Entry from '../components/index/entry'
import Layout from '../components/layout'
import MapDynamicWrapper from '../components/mapDynamicWrapper'
import React, { useState } from 'react';

export default function HomePage({ entries }) {
  const [showMap, setShowMap] = useState(false);

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
        <button onClick={() => {setShowMap(prev=>!prev)}} className="button button-secondary">ΧΑΡΤΗΣ</button>
      </nav>

      { showMap &&
        <section id="map-section">
          <MapDynamicWrapper // See map.js for map style options
            containerStyle={{width:800, height: 450, maxWidth: '90vw', maxHeight: '68vw'}} // Simple div container, has to have set dimensions
            onMapReady={(mapObject)=>{}} // If you want to handle the map, e.g. pan, zoom etc
            onEntryClick={(geojsonFeature)=>{}} // Handle user interaction, Scroll to video, etc
          />
        </section>
      }

      <section id="content">
        {
          entries.map(
            entry => <Entry entry={entry} key={entry.title} />
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
