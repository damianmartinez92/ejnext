import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import GitHub from "../components/Icons/Github";

import { loginWithGitHub, onAuthStateChanged } from "../firebase/client";

export default function Home() {
  const [user, setUser] = useState(null);

  const loguearGithub = () => {
    loginWithGitHub()
      .then((res) => {
        console.log("res", res);
        setUser(res);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ejemplo Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>Bienvenido/a al ejemplo con </h2>
        <h1>Next.js</h1>
        {!user && (
          <Button onClick={loguearGithub}>
            <GitHub width={24} height={24} fill="white" /> Login con GitHub
          </Button>
        )}
        {user && (
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={user.avatar} alt="Photo" width="120px" />
            <strong>Hola {user.username}!</strong>
          </div>
        )}
      </main>
    </div>
  );
}
