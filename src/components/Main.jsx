export default function Main(props) {
    const { data, yesterdayData } = props
    const displayData = yesterdayData || data;
    return (
        <div className="imgContainer">
            {displayData.media_type === 'video' ? (
                <iframe
                    id="inlineFrameExample"
                    title={displayData.title}
                    className="bgImage"
                    src={displayData.url}>
                </iframe>) : (
                    <img src={displayData.hdurl} alt={displayData.title || 'bg-img'} className="bgImage" />
        )}
 </div >
    )
}
