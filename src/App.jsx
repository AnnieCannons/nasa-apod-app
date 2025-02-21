import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"


function App() {
  const [data, setData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = "kvW34QoS2bkx8aILtNw3sw7hcenNCFmCGNnvOQok"
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

  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
         Loading...
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App
