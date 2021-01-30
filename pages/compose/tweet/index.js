import React, { useState } from "react";
import Button from "../../../components/Button/index";
import { useUser } from "../../../hooks/useUser";
import { useRouter } from "next/router";

import { addTweet } from "../../../firebase/client";

const index = () => {
  const user = useUser();
  const router = useRouter();
  const [tweet, setTweet] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabledButton(true);
    addTweet({
      avatar: user.avatar,
      content: tweet,
      userId: user.uid,
      username: user.username,
    })
      .then(() => {
        setDisabledButton(false);
        setTweet("");
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setDisabledButton(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="¿Qué está pasando?"
          maxLength={140}
          autoFocus={true}
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />

        <div style={{ padding: "15px" }}>
          <Button disabled={!tweet.length || disabledButton}>Publicar</Button>
        </div>
      </form>

      <style jsx>{`
        textarea {
          width: 100%;
          min-height: 130px;
          resize: none;
          border: none;
          outline: none;
          padding: 15px;
          font-size: 21px;
          background: transparent;
          color: white;
        }
        ::placeholder {
          color: rgba(205, 205, 205, 0.5);
          font-weight: 100;
        }
      `}</style>
    </>
  );
};

export default index;
