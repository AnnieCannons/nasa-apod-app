export default function Main(props) {
  const { data } = props;
  return (
    <div className="imgContainer">
      {data.media_type === "video" ? (
        <iframe src={`${data.url}?autoplay=1&mute=1`} className="bgImage"></iframe>
      ) : (
        <img
          src={data.hdurl}
          alt={data.title || "bg-img"}
          className="bgImage"
        />
      )}
    </div>
  );
}
