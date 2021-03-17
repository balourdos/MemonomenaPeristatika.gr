import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getEntries } from '../lib/entries'
import Entry from '../components/entry'

const GA_TRACKING_ID = 'G-FV7VX546WR'

export default function Home({ entries }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&amp;display=swap" rel="stylesheet" />
        <link rel="shortcut icon" type="image/jpg" href="https://img.icons8.com/ios-filled/50/000000/policeman-male--v1.png" />
        <link href="https://vjs.zencdn.net/7.10.2/video-js.css" rel="stylesheet" />
        <title>Μεμονωμένα Περιστατικά</title>
        <script async="" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
        <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
        />
        <meta property="og:title" content="Μεμονωμένα Περιστατικά" />
        <meta property="og:description" content="Αστυνομική βία, αυθαιρεσία και κατάχρηση εξουσίας" />
        <meta property="og:image" content="https://memonomenaperistatika.gr/social-header.jpg?v=1" />
        <meta property="og:url" content="https://memonomenaperistatika.gr" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1><em>{ entries.reduce((acc, entry) => acc + entry.videos.length, 0) }</em> Μεμονωμένα Περιστατικά</h1>
      <h3>Αστυνομικής <em>βίας</em> και <em>κατάχρησης</em> εξουσίας</h3>

      <nav>
        <a href="https://forms.gle/cNgRuEyUQWDPr4rr8" className="button button-primary">Αναφορα Περιστατικου</a>
        <a href="https://twitter.com/peristatika" className="button button-secondary">Twitter</a>
      </nav>

      <section id="content">
        {
          entries.map(
            entry => <Entry entry={entry} key={entry.url} />
          )
        }
      </section>

      <footer>
          <p><a href="https://forms.gle/cNgRuEyUQWDPr4rr8">Ανάφερε κάποιο μεμονωμένο περιστατικό</a> για να το αναρτήσουμε,
            {' '}<a href="mailto:balourdos@protonmail.com">επικοινώνησε μαζί μας</a>{' '}
              ή, αν γράφεις κώδικα, <a href="https://github.com/balourdos/MemonomenaPeristatika.gr">βοήθησέ μας με την
                  ανάπτυξη της πλατφόρμας</a>.</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const entries = await getEntries()

  console.log(entries)

  return {
    props: { entries }
  }
}
