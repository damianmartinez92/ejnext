import { useState, useEffect } from "react";
import Timeline from "../../components/Timeline/index";
import { useUser } from "../../hooks/useUser";

import { fetchLatestTweets } from "../../firebase/client";

export default function Home() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user &&
      fetchLatestTweets()
        .then(setTimeline)
        .catch((err) => console.error("Error consuming latest tweets: ", err));
  }, [user]);

  return (
    <>
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
      <nav></nav>

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
          display: fixed;
          bottom: 0;
          border-top: 1px solid rgb(61, 84, 102);
        }
      `}</style>
    </>
  );
}
