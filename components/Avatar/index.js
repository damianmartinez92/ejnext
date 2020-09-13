export default function Avatar({ src, alt }) {
  return (
    <>
      <img src={src} alt={alt} />
      <style jsx>{`
        img {
          width: 49px;
          height: 49px;
          border-radius: 9999px;
        }
      `}</style>
    </>
  );
}
