import { useState, useEffect } from "react";
import Timeline from "../../components/Timeline/index";
import { useUser } from "../../hooks/useUser";
import Link from "next/link";
import Head from 'next/head'

// SERVICES
import { fetchLatestTweets } from "../../firebase/client";

// ICONOS
import Create from "../../components/Icons/Create";
import Search from "../../components/Icons/Search";
import IconHome from "../../components/Icons/Home";

export default function Home() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user &&
      fetchLatestTweets()
        .then(setTimeline)
        .catch((err) => console.error(err));
  }, [user]);

  return (
    <>
    <Head>
      <title>Inicio / Tweets</title>
    </Head>
      <div>
        <header>
          <h1>Inicio</h1>
        </header>
      </div>
      <section>
        {timeline.length > 0 &&
          timeline.map(
            ({ id, username, content, avatar, name, userId, createdAt }) => (
              <Timeline
                key={id}
                username={username}
                content={content}
                avatar={avatar}
                name={name}
                id={id}
                userId={userId}
                createdAt={createdAt}
              />
            )
          )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <IconHome fill="white" width={25} height={25} />
          </a>
        </Link>
        <Link href="/home">
          <a>
            <Search fill="white" width={32} height={32} />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create fill="white" width={32} height={32} />
          </a>
        </Link>
      </nav>

      <style jsx>{`
        div {
          height: 49px;
          width: 100%;
          display: fixed;
          top: 0;
          border-bottom: 1px solid rgb(61, 84, 102);
        }
        header {
          display: flex;
          align-items: center;
        }
        h1 {
          font-size: 16px;
          margin-left: 15px;
        }
        section {
          width: 100%;
          height: calc(100vh - 98px);
          overflow: auto;
        }
        nav {
          height: 49px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          bottom: 0;
          border-top: 1px solid rgb(61, 84, 102);
        }
        nav a {
          width: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        nav a:hover {
          background: radial-gradient(grey 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
      `}</style>
    </>
  );
}
