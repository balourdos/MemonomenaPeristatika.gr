import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />

      <div className={styles.container}>
        {children}

        <Footer />
      </div>
    </div>
  );
}
