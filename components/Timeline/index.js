import Avatar from "../Avatar/index";
import { useTimeAgo } from "../../hooks/useTimeAgo";

export default function Timeline({
  username,
  content,
  avatar,
  name,
  id,
  createdAt,
  userId,
}) {
  const time = useTimeAgo(createdAt);
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={name} />
        </div>
        <section>
          <header>
            <strong>
              {username}
              {" · "}
            </strong>
            <span>{time}</span>
          </header>
          <p>{content}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          padding: 15px 15px;
          display: flex;
          border-bottom: 1px solid rgb(61, 84, 102);
        }
        div {
          padding-right: 10px;
        }
        section p {
          line-height: 1.3125;
          margin: 0;
          font-size: 14px;
        }
        span {
          color: lightgrey;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
