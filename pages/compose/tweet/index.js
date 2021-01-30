import React, { useState } from "react";
import Button from "../../../components/Button/index";
import { useUser } from "../../../hooks/useUser";
import { useRouter } from "next/router";

import { addTweet, uploadImage } from "../../../firebase/client";
import Head from "next/head";

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

const index = () => {
  const user = useUser();
  const router = useRouter();
  const [tweet, setTweet] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  // STATES PARA UPLOAD IMAGE
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgUrl, setImageUrl] = useState(null);

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    // OBTIENE EL DOCUMENTO CARGADO, SOLO LA POSICION 0
    const image = e.dataTransfer.files[0];
    // console.log(e.dataTransfer.files[0]);
    const task = uploadImage(image);
    setTask(task);
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  return (
    <>
      <Head>
        <title>Crear Tweet</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="¿Qué está pasando?"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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
        form {
          padding: 10px;
        }
        textarea {
          width: 100%;
          min-height: 130px;
          resize: none;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;

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
