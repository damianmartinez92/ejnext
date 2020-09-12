import Head from "next/head";
// import Link from "next/link";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import GitHub from "../components/Icons/Github";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ejemplo Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>Bienvenido/a al ejemplo con </h2><h1>Next.js</h1>
        <Button>
          <GitHub width={24} height={24} fill="white" /> Login con GitHub
        </Button>
      </main>
    </div>
  );
}
