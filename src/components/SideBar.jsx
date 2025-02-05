export default function SideBar({ handleToggleModal, data, fetchYesterdayData, yesterdayData }) {
    return (
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <h2>{yesterdayData ? yesterdayData.title : data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{yesterdayData ? yesterdayData.date : data?.date}</p>
                    <p>{yesterdayData ? yesterdayData.explanation : data?.explanation}</p>
                </div>
                <button onClick={fetchYesterdayData} className="yesterday-btn">
                    Get Yesterday’s Image
                </button>

                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}