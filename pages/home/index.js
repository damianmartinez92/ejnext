import { useState, useEffect } from "react";
import Timeline from "../../components/Timeline/index";

export default function Home() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <>
      <div>
        <header>
          <h1>Inicio</h1>  
        </header>
      </div>
      <section>
        {timeline.length > 0 &&
          timeline.map(({ id, username, message, avatar, name }) => (
            <Timeline
              key={id}
              username={username}
              message={message}
              avatar={avatar}
              name={name}
              id={id}
            />
          ))}
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
