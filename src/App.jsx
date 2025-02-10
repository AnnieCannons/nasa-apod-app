import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [yesterdayData, setYesterdayData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        console.log("Fetched from API today", apiData)
        setData(apiData)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])

  async function fetchYesterdayData() {
    const NASA_KEY = import.meta.env.VITE_API_KEY

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    const formattedDate = yesterday.toISOString().split("T")[0]

    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${formattedDate}`
    
    try {
      const res = await fetch(url);
      const apiData = await res.json();
      console.log("Fetched Yesterday’s Image", apiData);
      setYesterdayData(apiData);
    } catch (err) {
      console.log("Error fetching yesterday’s image:", err.message)
    }
  }

  return (
    <>
      {data ? (
        <Main data={data} yesterdayData={yesterdayData} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar
          data={data}
          handleToggleModal={handleToggleModal}
          fetchYesterdayData={fetchYesterdayData}
          yesterdayData={yesterdayData}
        />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App