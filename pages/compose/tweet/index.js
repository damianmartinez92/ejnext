import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/index";
import { useUser } from "../../../hooks/useUser";
import { useRouter } from "next/router";

import { addTweet, uploadImage } from "../../../firebase/client";
import Head from "next/head";
import Avatar from "../../../components/Avatar";

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

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then((imgUrl) => {
          setImageUrl(imgUrl);
        });
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabledButton(true);
    addTweet({
      avatar: user.avatar,
      content: tweet,
      userId: user.uid,
      username: user.username,
      img: imgUrl,
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
    setDrag(DRAG_IMAGE_STATES.NONE);
    // OBTIENE EL DOCUMENTO CARGADO, SOLO LA POSICION 0
    const image = e.dataTransfer.files[0];
    // console.log(image);

    const task = uploadImage(image);
    setTask(task);
  };

  return (
    <>
      <Head>
        <title>Crear Tweet</title>
      </Head>
      {user ? (
        <section>
          <div className="container-avatar">
            <Avatar src={user.avatar} alt="profile-avatar" />
          </div>
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
            {imgUrl && (
              <div className="remove-img">
                <button onClick={() => setImageUrl(null)}>X</button>
                <img src={imgUrl} alt="Image" />
              </div>
            )}
            <div style={{ marginLeft: "-60px", marginTop: "15px" }}>
              <Button disabled={!tweet.length || disabledButton}>
                Publicar
              </Button>
            </div>
          </form>
        </section>
      ) : (
        <img src="../loading.gif" alt="Cargando..." />
      )}

      <style jsx>{`
        section {
          display: flex;
          padding: 10px;
        }
        .container-avatar {
          margin: 15px 0px;
        }

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
        .remove-img {
          padding: 15px;
          position: relative;
        }

        .remove-img button {
          width: 28px;
          height: 28px;
          color: white;
          position: absolute;
          top: 30px;
          right: 30px;
          border: none;
          border-radius: 50%;
          background-color: rgb(0, 0, 0, 0.3);
        }

        img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default index;
