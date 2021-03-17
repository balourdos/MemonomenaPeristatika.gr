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
        <a href='https://forms.gle/cNgRuEyUQWDPr4rr8' className='button button-primary'>Αναφορα Περιστατικου</a>
        <a href='https://twitter.com/peristatika' className='button button-secondary'>Twitter</a>
      </nav>

      <section id="content">
        {
          entries.map(
            entry => <Entry entry={entry} key={entry.url} />
          )
        }

          <h4>11 Μαρτίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    ΑΠΘ:

                  Επίθεση σε δημοσιογράφους
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734549/e07feb54512ec3130d1b016ba5c39556.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/86d26951f480398f18230c27b48c7b96.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/86d26951f480398f18230c27b48c7b96.mp4' target='_blank'>Επίθεση σε δημοσιογράφους</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                  Επίθεση σε φοιτητές
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734555/f5cdd1250a15823506257cc6142b95e2.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d99845bea5d8f8cca3ac5d2c84a3a637.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d99845bea5d8f8cca3ac5d2c84a3a637.mp4' target='_blank'>Επίθεση σε φοιτητές</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>10 Μαρτίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Κλωτσιές σε κορίτσι
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734565/b4b2a95fcc80f78f2a9a7c6477fa8530.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/a61d0acdd8d6607ee8c32860be5eaad1.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/a61d0acdd8d6607ee8c32860be5eaad1.mp4' target='_blank'>Κλωτσιές σε κορίτσι</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>9 Μαρτίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Eπίθεση σε πολίτη με δίκυκλο, άγρια σύλληψη, ξυλοδαρμός πολίτη και παρεμπόδιση δημοσιογράφων
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734514/92050e2ab3c4075730d82c5c675036dc.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d1f09f37fd6bab019c0995dc4ed017f8.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d1f09f37fd6bab019c0995dc4ed017f8.mp4' target='_blank'>Eπίθεση σε πολίτη με δίκυκλο, άγρια σύλληψη, ξυλοδαρμός πολίτη και παρεμπόδιση δημοσιογράφων</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  &#34;Πάμε να τους γαμήσουμε! Να τους σκοτώσουμε&#34;
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734570/f4d93fbe096f8aa075d2b927ba851f4b.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/4218cb563f1df4acbfb6be5a11436bc3.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/4218cb563f1df4acbfb6be5a11436bc3.mp4' target='_blank'>&#34;Πάμε να τους γαμήσουμε! Να τους σκοτώσουμε&#34;</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Ξυλοδαρμός άνδρα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734574/300c4ef3ce5fb072b771bf7b0ced765c.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/594f2371053c91232e0ca864d784dda7.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/594f2371053c91232e0ca864d784dda7.mp4' target='_blank'>Ξυλοδαρμός άνδρα</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Προέκταση όπλου
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615753135/8f13e119f92381ae7a68d0d366481745.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/df402c165b2d271f84f9e44094e40c8e.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/df402c165b2d271f84f9e44094e40c8e.mp4' target='_blank'>Προέκταση όπλου</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Εξώθηση από κατάστημα και ξυλοδαρμός
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734580/44aaa7c652a1e03f805ceb8d5c2af213.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/373ebdb57c6272e23aa9b6dad0f2ba73.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/373ebdb57c6272e23aa9b6dad0f2ba73.mp4' target='_blank'>Εξώθηση από κατάστημα και ξυλοδαρμός</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Επίθεση σε γυναίκα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734584/56e624a5ff226667fc68ddbed7df583c.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/90f5fc82314c55812a2e53799737a5d6.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/90f5fc82314c55812a2e53799737a5d6.mp4' target='_blank'>Επίθεση σε γυναίκα</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Αστυνομικός χαστουκίζει γυναίκα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857897/6b17466041ba2748600c45dbb3f229ad.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/0546ab1992057e84fc0cc9a1cf7a1632.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/0546ab1992057e84fc0cc9a1cf7a1632.mp4' target='_blank'>Αστυνομικός χαστουκίζει γυναίκα</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Αστυνομικοί τραβάνε άνθρωπο μέσα από πολυκατοικία και τον κλωτσάνε στο δρόμο
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857900/cea9e4a5549694bbe0beca8bb4aa11bf.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/c6eb59bff68b3ca5e127913c14c9bb9a.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/c6eb59bff68b3ca5e127913c14c9bb9a.mp4' target='_blank'>Αστυνομικοί τραβάνε άνθρωπο μέσα από πολυκατοικία και τον κλωτσάνε στο δρόμο</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>7 Μαρτίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    Νέα Σμύρνη:

                  Ξυλοδαρμός άνδρα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734588/bce5d6946e9f1bc69f76c88924ff9953.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/0a2e64294aebbe87faad188319806b40.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/0a2e64294aebbe87faad188319806b40.mp4' target='_blank'>Ξυλοδαρμός άνδρα</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                  Παρενόχληση και ξυλοδαρμός δικηγόρου
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615735098/b305e38c9f6b6b1d43754006c97af00d.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/7fe53fc49ca89acc40fc2aeeb33023ee.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/7fe53fc49ca89acc40fc2aeeb33023ee.mp4' target='_blank'>Παρενόχληση και ξυλοδαρμός δικηγόρου</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>24 Φεβρουαρίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    Αθήνα:

                  Διάλυση ειρηνικής διαδήλωσης
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858050/19f6114802891144f897fa3ee056dcaa.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d561f81a492f72c921f6f7a9dd12313f.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d561f81a492f72c921f6f7a9dd12313f.mp4' target='_blank'>Διάλυση ειρηνικής διαδήλωσης</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>22 Φεβρουαρίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    ΑΠΘ:

                  Σύρσιμο φοιτητή με το κεφάλι του στο δρόμο
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734667/c4602573a7e27b2db6c70e8337996ad1.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/c9c0eb0009d520ddbf551a9cbfc3c959.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/c9c0eb0009d520ddbf551a9cbfc3c959.mp4' target='_blank'>Σύρσιμο φοιτητή με το κεφάλι του στο δρόμο</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>10 Φεβρουαρίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    Θεσσαλονίκη - Όλύμπου:

                  Αγκωνιές και κλωτσιές σε πολίτη
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734687/48b4d1f819f1178379cbcbc3e8649b39.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/b20683385f1abfaf8f26bc8f863f0173.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/b20683385f1abfaf8f26bc8f863f0173.mp4' target='_blank'>Αγκωνιές και κλωτσιές σε πολίτη</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Αθήνα:

                  Γροθιές σε ακινητοποιημένο συλληφθέντα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615752668/ddd548c97e101e257c964ec2c7ac0370.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/fab926ae12e5eb9cdf9f015c81c9d20a.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/fab926ae12e5eb9cdf9f015c81c9d20a.mp4' target='_blank'>Γροθιές σε ακινητοποιημένο συλληφθέντα</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>4 Φεβρουαρίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    ΑΠΘ:

                  Ξυλοδαρμός υποψήφιου διδάκτορα του ΑΠΘ
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734675/af7148bc6ea803f108682b3b5fe5b1b6.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/7c580443fd867c65646b2c253c85610f.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/7c580443fd867c65646b2c253c85610f.mp4' target='_blank'>Ξυλοδαρμός υποψήφιου διδάκτορα του ΑΠΘ</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>3 Φεβρουαρίου 2021</h4>
          <ul>

              <li>
                <span className='description'>

                    Αθήνα:

                  Επίθεση σε ειρηνική διαδήλωση
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster=""

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d99a4502b958c905d62c662e82c694f0.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d99a4502b958c905d62c662e82c694f0.mp4' target='_blank'>Επίθεση σε ειρηνική διαδήλωση</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>24 Δεκεμβρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Πύργος Ηλείας:

                  Παρεμπόδιση καταγραφής περιστατικού αστυνομικής βίας
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858145/47744d0275e61b02819d74709c75a84a.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/15505479a19a29e513d40fc7ad8de779.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/15505479a19a29e513d40fc7ad8de779.mp4' target='_blank'>Παρεμπόδιση καταγραφής περιστατικού αστυνομικής βίας</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>11 Δεκεμβρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Λέσβος:

                  Αστυνομικοί ξυλοκοπούν πρόσφυγες στη Μυτιλήνη
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857939/b844d62ce0d470fad1906011998187a4.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/5e43a37eb7cb7b65acb72b66c8732268.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/5e43a37eb7cb7b65acb72b66c8732268.mp4' target='_blank'>Αστυνομικοί ξυλοκοπούν πρόσφυγες στη Μυτιλήνη</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>6 Δεκεμβρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Εξάρχεια:

                  Ρίψη κρότου λάμψης εντός πολυκατοικίας
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615752682/ca8279f9d3375d79a212bad226c04258.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/70436929340da7c1b40d7b5ffcb01228.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/70436929340da7c1b40d7b5ffcb01228.mp4' target='_blank'>Ρίψη κρότου λάμψης εντός πολυκατοικίας</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Χανιά:

                  Επίθεση σε συγκέντρωση
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858004/e13c649373c368efc7262be127eb87e3.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/f64c4780cdb62d70fd96a124b660a5e2.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/f64c4780cdb62d70fd96a124b660a5e2.mp4' target='_blank'>Επίθεση σε συγκέντρωση</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Εξάρχεια:

                  Εισβολή σε πολυκατοικία
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858011/0a98b08f5f77d86e6958d0e98680a430.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d1463eaae509189832417aec280f16ac.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/d1463eaae509189832417aec280f16ac.mp4' target='_blank'>Εισβολή σε πολυκατοικία</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>17 Νοεμβρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Σεπόλια:

                  Επίθεση αστυνομικών σε φοιτητή και στην οικογένειά του
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857912/f8e6c6c5d7263e1999b921938f2e5373.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/44426ef39312b09133383ff4338045ec.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/44426ef39312b09133383ff4338045ec.mp4' target='_blank'>Επίθεση αστυνομικών σε φοιτητή και στην οικογένειά του</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Αθήνα:

                  Η αστυνομία επιτίθεται σε διαδηλωτές που αποχωρούν συντεταγμένα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857920/8f27b450383b954d6e4e19b12f8c54f8.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/2dc48c829884fe8c6968797639ba28a1.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/2dc48c829884fe8c6968797639ba28a1.mp4' target='_blank'>Η αστυνομία επιτίθεται σε διαδηλωτές που αποχωρούν συντεταγμένα</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Αθήνα:

                  Διάλυση ειρηνικής διαδήλωσης
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858038/a7f670629ad62e7db6f1d6c912d5aa94.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/763c2527c7d62d5fdb0c194c23406e32.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/763c2527c7d62d5fdb0c194c23406e32.mp4' target='_blank'>Διάλυση ειρηνικής διαδήλωσης</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>14 Νοεμβρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    ΠΑΤΡΑ:

                  ΜΑΤ περικυκλωνουν και χτυπαν πορεια 40 ατομων και απειλουν με ευθυβολη ριψη χημικων
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857893/2103eff8b0a3e041da9feae5ea724e77.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/8fbecb4029b5b694e660109a8dbfd491.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/8fbecb4029b5b694e660109a8dbfd491.mp4' target='_blank'>ΜΑΤ περικυκλωνουν και χτυπαν πορεια 40 ατομων και απειλουν με ευθυβολη ριψη χημικων</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Καρδίτσα:

                  Επίθεση αστυνομικών σε ζευγάρι και βίαιη σύλληψη
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857927/34eb5729d33214e042bf0a9151246418.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/995361aaaa14adf83ebab667347faf07.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/995361aaaa14adf83ebab667347faf07.mp4' target='_blank'>Επίθεση αστυνομικών σε ζευγάρι και βίαιη σύλληψη</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>2 Οκτωβρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Aθήνα:

                  Επίθεση σε φοιτητική πορεία
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster=""

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/fd1fa0539ed77a2af910ea78432af65b.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/fd1fa0539ed77a2af910ea78432af65b.mp4' target='_blank'>Επίθεση σε φοιτητική πορεία</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>10 Σεπτεμβρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Λέσβος:

                  Αστυνομικοί ρίχνουν δακρυγόνα σε παιδιά και ηλικιωμένους που φεύγουν από τη φλεγόμενη Μόρια
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857947/2e5784d08395b391a85f87d2e85b2f26.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/2c9c45ab21d41b338ce6a836357e906e.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/2c9c45ab21d41b338ce6a836357e906e.mp4' target='_blank'>Αστυνομικοί ρίχνουν δακρυγόνα σε παιδιά και ηλικιωμένους που φεύγουν από τη φλεγόμενη Μόρια</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>17 Ιουλίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Αθήνα:

                  Ξυλοδαρμός Τιτκώβ και Λάλου
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615752694/bc470d4db901503ff9e8eb1aeb868234.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/a3ed76dd086a64542f4322df7d524b4d.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/a3ed76dd086a64542f4322df7d524b4d.mp4' target='_blank'>Ξυλοδαρμός Τιτκώβ και Λάλου</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Αθήνα:

                  Ξυλοδαρμός διαδηλωτών
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858068/6860e6451e658e1c912ac356e9840dce.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/fdef40c8ec80c08f24896c3b0fb9e3b0.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/fdef40c8ec80c08f24896c3b0fb9e3b0.mp4' target='_blank'>Ξυλοδαρμός διαδηλωτών</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Αθήνα:

                  Τοποθέτηση μπουκαλιού σε σακίδιο συλληφθέντα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858107/c90e41676a2a2b8d320198afa85aaa10.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/1cd2acba3a7d7d07a581b8cbbac4aa20.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/1cd2acba3a7d7d07a581b8cbbac4aa20.mp4' target='_blank'>Τοποθέτηση μπουκαλιού σε σακίδιο συλληφθέντα</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>9 Ιουλίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Αθήνα:

                  Επίθεση με μηχανάκια σε πλήθος διαδηλωτών
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615752688/4b4b728de67f6a21ed8c5316e1510200.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/df090b67576732fcc56177c8de6d327d.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/df090b67576732fcc56177c8de6d327d.mp4' target='_blank'>Επίθεση με μηχανάκια σε πλήθος διαδηλωτών</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>14 Ιουνίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Βόλος:

                  Άγριος ξυλοδαρμός άνδρα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734535/8268cf0e50ba7504f4e7a12c50e4f5e6.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/5a23870db22bd05b31d331c8944e7798.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/5a23870db22bd05b31d331c8944e7798.mp4' target='_blank'>Άγριος ξυλοδαρμός άνδρα</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>24 Μαΐου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Σεπόλια:

                  Ξυλοδαρμός δύο νεαρών από αστυνομικούς
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857958/e6a46c9feb72dadea9eb633d27f46ca6.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/9feabb490b70d82d56deb44848b9a49c.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/9feabb490b70d82d56deb44848b9a49c.mp4' target='_blank'>Ξυλοδαρμός δύο νεαρών από αστυνομικούς</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>8 Μαΐου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Κυψέλη:

                  Κλωτσιές σε πολίτες
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615752676/690953fa875d5d1a4c63e1d53daba9c3.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/a6469736c6d45df8f99038379f6cbc20.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/a6469736c6d45df8f99038379f6cbc20.mp4' target='_blank'>Κλωτσιές σε πολίτες</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>27 Απριλίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Ιλίσια:

                  Ξυλοδαρμός μοτοσυκλετιστή
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857932/597b744d0e4d23c9f09db0783983c0ff.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/5273967942e032440376468081a483b7.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/5273967942e032440376468081a483b7.mp4' target='_blank'>Ξυλοδαρμός μοτοσυκλετιστή</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>27 Φεβρουαρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Λέσβος:

                  Σπάσιμο αυτοκινήτων
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734523/d9e5d9877eb1b6afe63f7afacaacca19.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/39a3895395be3d911d4d50181a6c8c2a.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/39a3895395be3d911d4d50181a6c8c2a.mp4' target='_blank'>Σπάσιμο αυτοκινήτων</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Χίος:

                  Σπάσιμο περισσότερων αυτοκινήτων
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734529/40e5b711e78ea2c5c29e3dd24a76bb45.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/1bab27df1b223db5668e3a5d0d1beaff.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/1bab27df1b223db5668e3a5d0d1beaff.mp4' target='_blank'>Σπάσιμο περισσότερων αυτοκινήτων</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>24 Φεβρουαρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Αθήνα:

                  Κουκουλοφόρος αστυνομικός εκτός υπηρεσίας βγάζει όπλο εναντίον φοιτητών στο προαύλιο της ΑΣΟΕΕ
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857966/edb28b50a77452154b1d30eab28ceb53.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/23753cf97d2e26c4df1b3de2357ff7cc.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/23753cf97d2e26c4df1b3de2357ff7cc.mp4' target='_blank'>Κουκουλοφόρος αστυνομικός εκτός υπηρεσίας βγάζει όπλο εναντίον φοιτητών στο προαύλιο της ΑΣΟΕΕ</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>26 Ιανουαρίου 2020</h4>
          <ul>

              <li>
                <span className='description'>

                    Μενίδι:

                  Αστυνομικής χτυπάει 11χρονο παιδί
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857972/0789e0ec85c3330dfc173d56ffd91895.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/8ba0b758c072a2e747311bef7ccf7cd7.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/8ba0b758c072a2e747311bef7ccf7cd7.mp4' target='_blank'>Αστυνομικής χτυπάει 11χρονο παιδί</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>6 Δεκεμβρίου 2019</h4>
          <ul>

              <li>
                <span className='description'>

                    Εξάρχεια:

                  Αστυνομικοί ξυλοκοπούν άνδρα πεσμένο στο δρόμο
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857978/37d0370164e7031c1f5d6c9d6559918a.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/1e9124177adedc47b4f00ad3345d1f5d.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/1e9124177adedc47b4f00ad3345d1f5d.mp4' target='_blank'>Αστυνομικοί ξυλοκοπούν άνδρα πεσμένο στο δρόμο</a>
                  </p>
                </video>
              </li>

              <li>
                <span className='description'>

                    Εξάρχεια:

                  Ξυλοδαρμός πολιτών που δεν προβάλουν αντίσταση
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858137/9844280e9cb67b20e3aaf9cfc43d668e.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/06089d9a8ae32f563bcda3148f6bcc1a.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/06089d9a8ae32f563bcda3148f6bcc1a.mp4' target='_blank'>Ξυλοδαρμός πολιτών που δεν προβάλουν αντίσταση</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>17 Νοεμβρίου 2019</h4>
          <ul>

              <li>
                <span className='description'>

                    Eξάρχεια:

                  Ξυλοδαρμός πολιτών
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858058/bc3d68a233c8bdf63c892b6ec32c511e.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/116a220f2764c09225993dfb297a413f.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/116a220f2764c09225993dfb297a413f.mp4' target='_blank'>Ξυλοδαρμός πολιτών</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>18 Οκτωβρίου 2019</h4>
          <ul>

              <li>
                <span className='description'>

                    Ομόνοια:

                  Σύρσιμο γυναίκας με ειδικές ανάγκες έξω από το τμήμα και βρέξιμο της με μάνικα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615734518/3b177455727d06f2cc2f11ca0b0e41cd.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/9eabee77610893e585a68f23c4159689.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/9eabee77610893e585a68f23c4159689.mp4' target='_blank'>Σύρσιμο γυναίκας με ειδικές ανάγκες έξω από το τμήμα και βρέξιμο της με μάνικα</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>15 Απριλίου 2018</h4>
          <ul>

              <li>
                <span className='description'>

                    Αθήνα:

                  Επίθεση σε διαδήλωση
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858097/25e94afa4436be4b8b6ab11db3736d5f.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/0f8d53de6f44126c5d26750546596552.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/0f8d53de6f44126c5d26750546596552.mp4' target='_blank'>Επίθεση σε διαδήλωση</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>17 Νοεμβρίου 2014</h4>
          <ul>

              <li>
                <span className='description'>

                    Εξάρχεια:

                  Κλοπή από περίπτερο και ξυλοδαρμός υπαλλήλου
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858083/c09507ff88c3627c9dca9d252b0b3b15.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/3d44794d94b61e9fad32c79a251b5659.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/3d44794d94b61e9fad32c79a251b5659.mp4' target='_blank'>Κλοπή από περίπτερο και ξυλοδαρμός υπαλλήλου</a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>13 Νοεμβρίου 2014</h4>
          <ul>

              <li>
                <span className='description'>

                    Πολυτεχνείο:

                  Ξυλοδαρμός φοιτητών
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615857994/1c4cf25551b963fc1a59fafac9badad5.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/648ebad8c7c40cba4c9c9e33fee0709d.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/648ebad8c7c40cba4c9c9e33fee0709d.mp4' target='_blank'>Ξυλοδαρμός φοιτητών </a>
                  </p>
                </video>
              </li>

          </ul>

          <h4>29 Ιουνίου 2011</h4>
          <ul>

              <li>
                <span className='description'>

                    Αθήνα:

                  Τοποθέτηση μπουκαλιών σε σακίδιο συλληφθέντα
                </span>
                <video
                  id="my-video"
                  className="video-js"
                  controls
                  preload="none"
                  width="640"
                  height="264"

                    poster="https://res.cloudinary.com/dn0gn981f/video/upload/v1615858237/34144a0ca60e55d54288a7cc3f04ccac.jpg"

                  data-setup="{ preload: 'none' }"
                >
                  <source src="https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/86b7b84f9a1f52b6e7ef77a970625fa9.mp4" type="video/mp4" />
                  <p className="vjs-no-js">
                    <a href='https://s3.eu-west-3.amazonaws.com/memonomenaperistatika.gr/86b7b84f9a1f52b6e7ef77a970625fa9.mp4' target='_blank'>Τοποθέτηση μπουκαλιών σε σακίδιο συλληφθέντα</a>
                  </p>
                </video>
              </li>

          </ul>

      </section>

      <footer>
          <p><a href="https://forms.gle/cNgRuEyUQWDPr4rr8">Ανάφερε κάποιο μεμονωμένο περιστατικό</a> για να το αναρτήσουμε,
            <a href='mailto:balourdos@protonmail.com'>επικοινώνησε μαζί μας</a>
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
