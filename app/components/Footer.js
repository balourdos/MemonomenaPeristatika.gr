import { useState } from "react";

function handleDonationsClick() {
  if (gtag && !donationsVisible) {
    gtag("event", "click", { target: "donations" });
  }
  setDonationsVisibility(!donationsVisible);
}

function Footer() {
  const [donationsVisible, setDonationsVisibility] = useState(false);

  return (
    <footer>
      <p>
        <a href="https://forms.gle/cNgRuEyUQWDPr4rr8">
          Ανάφερε κάποιο μεμονωμένο περιστατικό
        </a>{" "}
        για να το αναρτήσουμε,{" "}
        <a href="mailto:balourdos@protonmail.com">επικοινώνησε μαζί μας</a> ή,
        αν γράφεις κώδικα,{" "}
        <a href="https://github.com/balourdos/MemonomenaPeristatika.gr">
          βοήθησέ μας με την ανάπτυξη της πλατφόρμας
        </a>
        .
      </p>
      <button onClick={handleDonationsClick}>Donate</button>

      {donationsVisible && (
        <section id="donations">
          <p>
            Σε ευχαριστούμε πολύ για τη βοήθεια! Οι δωρεές θα χρησιμοποιηθούν
            αποκλειστικά για τα πάγια έξοδα συντήρησης του site.
            <br />
            Ξεκινήσαμε πριν μόνο μερικές ημέρες. Αυτή τη στιγμή, τα κόστη μας
            είναι ένας dedicated server που κοστίζει 30&euro; το μήνα. Το να
            κάνουμε host video είναι ακριβό - και τα κόστη μας θα συνεχίσουν να
            αυξάνονται καθώς αυξάνεται η κίνηση.
          </p>
          <ul>
            <li>
              <strong>Bitcoin:</strong>{" "}
              bc1q9rn4q5j7w294jkef3qy7l0sd208q58gzgyccp4
            </li>
            <li>
              <strong>Bitcoin Cash:</strong>{" "}
              qp032xrc88rw7m32c48zut7mhlcf8gh85ufq7rnuzw
            </li>
            <li>
              <strong>Ethereum:</strong>{" "}
              0xD2FBd2600643C286414f6618de0b919b279992a1
            </li>
            <li>
              <strong>Cardano:</strong>{" "}
              addr1q862rr2exhe8wz57gd6ggmfgz5amy4xlhr544ql545ptfuh55xx4jd0jwu9fusm5s3kjs9fmkf2dlw8ft2plftgzkneqmzg5j6
            </li>
            <li>
              <strong>Monero:</strong>{" "}
              443iREMvecGMGFcykUqizuLdSajue3hnwgWL3k7gMkm9ikALUc8aoctRprsX6acdME7ckDYkajwgkcNXdG6q8x6Z4GEfZQh
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
              <strong>Fiat (EUR, USD, CHF, κλπ.):</strong>{" "}
              <a href="mailto:balourdos@protonmail.com">
                επικοινώνησε μαζί μας
              </a>
            </li>
          </ul>
        </section>
      )}
    </footer>
  );
}

export default Footer;
