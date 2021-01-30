import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import GitHub from "../components/Icons/Github";

import { useRouter } from "next/router";

import { loginWithGitHub } from "../firebase/client";
import { useUser, USER_STATES } from "../hooks/useUser";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  const loguearGithub = () => {
    loginWithGitHub()
      .then((res) => {
        // console.log("loginGit", res);
        useUser(res);
      })
      .catch((err) => console.error("err", err));
  };

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Clone Twitter Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {user === USER_STATES.NOT_KNOW ? (
          <img src="loading.gif" alt="Cargando..." />
        ) : (
          <>
            <h2>Bienvenido/a al clone de Twitter con </h2>
            <h1>Next.js</h1>
            {user === USER_STATES.NOT_LOGGER && (
              <Button onClick={loguearGithub}>
                <GitHub width={24} height={24} fill="white" /> Iniciar sesión
                con GitHub
              </Button>
            )}
          </>
        )}
      </main>
    </div>
  );
}
