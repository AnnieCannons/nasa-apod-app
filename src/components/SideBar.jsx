export default function SideBar(props) {
    const { handleToggleModal, data, fetchYesterdayImage, yesterdayImage } = props;

    return (
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>

                {/* Button to fetch yesterday's image */}
                <button onClick={fetchYesterdayImage} className="yesterday-button">
                    Get Yesterday's Image
                </button>

                {/* Display yesterday’s image if available */}
                {yesterdayImage && (
                    <div className="yesterdayImageContainer">
                        <h3>{yesterdayImage.title}</h3>
                        <img src={yesterdayImage.url} alt={yesterdayImage.title} />
                        <p>{yesterdayImage.explanation}</p>
                    </div>
                )}

                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>

            {/* Inline Styles */}
            <style>
                {`
                .yesterday-button {
                    background-color: orange;
                    color: black;
                    font-weight: bold;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .yesterday-button:hover {
                    background-color: hotpink;
                }
                `}
            </style>
        </div>
    );
}
