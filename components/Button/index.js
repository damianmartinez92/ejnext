export default function Button({ children, onClick }) {
  return (
    <>
      <button>{children}</button>
      <style jsx>
        {`
          button {
            background: black;
            border-radius: 24px;
            font-size: 16px;
            font-weight: 800;
            color: white;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 12px 24px;
            opacity: 1;
            transition: opacity .3s ease;
          },
          button > :global(svg){
              margin-right: 12px;
          }
          button:hover{
              opacity: .7;
          }
        `}
      </style>
    </>
  );
}
