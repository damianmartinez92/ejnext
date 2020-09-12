import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function About({user}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ejemplo Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>About! Soy la prop {user}</h1>
        <h1 className={styles.title}>
          Quieres ir al{" "}
          <Link href="/">
            <a>Home?</a>
          </Link>
        </h1>
      </main>
    </div>
  );
}

About.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello')
  .then(res => res.json())
}
