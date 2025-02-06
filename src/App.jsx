import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"


function App() {
  const [data, setData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [yesterdayData, setYesterdayData] = useState(null)

  function handleToggleModal() {
    setShowModal(!showModal)
  }
  function getYesterdaysDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  }


  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`
      try {
        const res = await fetch(url)
        const apiData = await res.json()
        console.log(apiData)
        setData(apiData)
        console.log('Fetched from API today')
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])


    async function fetchYesterdayData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const date = getYesterdaysDate();
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}` + `&date=${date}`
      try {
        const res = await fetch(url)
        const apiData = await res.json()
        console.log(apiData)
        setYesterdayData(apiData)
        console.log('Fetched from API yesterday')
      } catch (err) {
        console.log(err.message)
      }
    }
 
 function handleYesterdayClick() {
    fetchYesterdayData();
  }

  return (
    <>
      {data ? (<Main data={data} yesterdayData={yesterdayData} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} yesterdayData={yesterdayData} handleYesterdayClick={handleYesterdayClick} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App
