
export default function SideBar(props) {
    const { handleToggleModal, data, fetchYesterdayPhoto } = props;

    return (
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <h2>{data?.title || "NASA Astronomy Photo"}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date || "Select an image"}</p>
                    <p>{data?.explanation || "Click the button to see yesterday’s image."}</p>
                    
                    
                    <button onClick={fetchYesterdayPhoto} >
                        Yesterday's Image
                    </button>
                </div>
                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
}

