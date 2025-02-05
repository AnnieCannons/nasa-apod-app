import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [date, setDate] = useState( new Date().toISOString().slice(0, 10))

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  async function fetchAPIData(day) {
    const NASA_KEY = import.meta.env.VITE_API_KEY
    const url = 'https://api.nasa.gov/planetary/apod' + `?date=${day}` + `&api_key=${NASA_KEY}`
    console.log(day)
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

  useEffect(() => {
    fetchAPIData(date)
  }, [date])

const changeDateToYesterday = () => {
  const yesterday =  new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  setDate(yesterday);
  console.log(date)
}

  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} changeDateToYesterday={changeDateToYesterday} />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App
