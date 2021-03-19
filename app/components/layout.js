import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
  const [donationsVisible, setDonationsVisibility] = useState(false)

  function handleDonationsClick() {
    if (plausible && !donationsVisible) {
      plausible('DonateButtonClicked')
    }
    setDonationsVisibility(!donationsVisible)
  }

  return (
    <div>
      <Head>
        <script async defer data-domain="memonomenaperistatika.gr" src="https://plausible.io/js/plausible.js"></script>
        <script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&amp;display=swap" rel="stylesheet" />
        <link rel="shortcut icon" type="image/jpg" href="https://img.icons8.com/ios-filled/50/000000/policeman-male--v1.png" />
        <link href="https://vjs.zencdn.net/7.10.2/video-js.css" rel="stylesheet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.container}>
        {children}

        <footer>
        <p><a href="https://forms.gle/cNgRuEyUQWDPr4rr8" target="_blank">Ανάφερε κάποιο μεμονωμένο περιστατικό</a> για να το αναρτήσουμε,
          {' '}<a href="mailto:balourdos@protonmail.com">επικοινώνησε μαζί μας</a>{' '}
            ή, αν γράφεις κώδικα, <a href="https://github.com/balourdos/MemonomenaPeristatika.gr" target="_blank">βοήθησέ μας με την
                ανάπτυξη της πλατφόρμας</a>.</p>
        <button onClick={handleDonationsClick}>Donate</button>

        {donationsVisible && (
          <section id="donations">
            <p>
              Σε ευχαριστούμε πολύ για τη βοήθεια! Οι δωρεές θα χρησιμοποιηθούν αποκλειστικά για τα πάγια έξοδα συντήρησης του site.<br />
              Ξεκινήσαμε πριν μόνο μερικές ημέρες. Αυτή τη στιγμή, τα κόστη μας είναι το hosting των videos στο AWS S3, το οποίο υπολογίζεται στα 700&euro; τον μήνα. Το να κάνουμε host video είναι ακριβό - και τα κόστη μας θα συνεχίσουν να αυξάνονται καθώς αυξάνεται η κίνηση.
            </p>
            <ul>
              <li>
                <strong>Bitcoin:</strong> bc1q9rn4q5j7w294jkef3qy7l0sd208q58gzgyccp4
              </li>
              <li>
                <strong>Bitcoin Cash:</strong> qp032xrc88rw7m32c48zut7mhlcf8gh85ufq7rnuzw
              </li>
              <li>
                <strong>Ethereum:</strong> 0xD2FBd2600643C286414f6618de0b919b279992a1
              </li>
              <li>
                <strong>Cardano:</strong> addr1q862rr2exhe8wz57gd6ggmfgz5amy4xlhr544ql545ptfuh55xx4jd0jwu9fusm5s3kjs9fmkf2dlw8ft2plftgzkneqmzg5j6
              </li>
              <li>
                <strong>Monero:</strong> 443iREMvecGMGFcykUqizuLdSajue3hnwgWL3k7gMkm9ikALUc8aoctRprsX6acdME7ckDYkajwgkcNXdG6q8x6Z4GEfZQh
              </li>
              <li>
                <strong>Zcash:</strong> t1ecsqf4uZVj4vjnH999vEE3PkZqrHiVYeM
              </li>
              <li>
                <strong>Litecoin:</strong> LWkVxWJpHVkHzJNWnbQtuzBnJgvvqt8RMf
              </li>
              <li>
                <strong>Dogecoin:</strong> DKWw19q166JxXKaohyTJ9Dz1g4JbSjNMGn
              </li>
              <li>
                <strong>Fiat (EUR, USD, CHF, κλπ.):</strong> <a href="mailto:balourdos@protonmail.com">επικοινώνησε μαζί μας</a>
              </li>
            </ul>
          </section>
        )}
      </footer>
      </div>
    </div>
  )
}
