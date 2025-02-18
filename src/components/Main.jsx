export default function Main(props) {
    const { data } = props
    return (
<div className="imgContainer">
<img src={data.hdurl} alt={data.title || 'bg-img'} className="bgImage" />
            {data.media_type === 'video' ? (
                <iframe
                    id="inlineFrameExample"
                    title={data.title}
                    className="bgImage"
                    src={data.url}>
                </iframe>) : (
                    <img src={data.hdurl} alt={data.title || 'bg-img'} className="bgImage" />
        )}


</div>

    )
}