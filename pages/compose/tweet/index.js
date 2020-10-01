import React from "react";
import Button from "../../../components/Button/index";

const index = () => {
  return (
    <>
      <form>
        <textarea
          placeholder="¿Qué está pasando?"
          maxLength={140}
          autoFocus={true}
        />

        <div style={{ padding: "15px" }}>
          <Button>Publicar</Button>
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
