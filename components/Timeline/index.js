import Avatar from "../Avatar/index";

export default function Timeline({ username, message, avatar, name, id }) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={name} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
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
        }
      `}</style>
    </>
  );
}
