export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>{children}</button>
      <style jsx>
        {`
          button {
            background: rgb(21, 32, 43);
            border-color: rgb(29, 161, 242);
            border-radius: 24px;
            font-size: 16px;
            font-weight: 800;
            color: rgb(29, 161, 242);
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 12px 24px;
            opacity: 1;
            transition: opacity 0.3s ease;
            user-select: none;
          }
          ,
          button > :global(svg) {
            margin-right: 12px;
          }
          button:hover {
            opacity: 0.7;
          }
          button[disabled]{
            opacity: 0.4;
          }
        `}
      </style>
    </>
  );
}
