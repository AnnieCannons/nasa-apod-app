import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [yesterdayImage, setYesterdayImage] = useState(null);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        console.log(apiData);
        setData(apiData);
        console.log("Fetched from API today");
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);

  // Function to fetch yesterday's image (Only runs when the button is clicked)
  async function fetchYesterdayImage() {
    const NASA_KEY = import.meta.env.VITE_API_KEY;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Get yesterday's date
    const formattedDate = yesterday.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${formattedDate}`;

    try {
      const res = await fetch(url);
      const apiData = await res.json();
      console.log("Fetched Yesterday's Image:", apiData);
      setYesterdayImage(apiData); // Set the image only when button is clicked
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar
          data={data}
          handleToggleModal={handleToggleModal}
          fetchYesterdayImage={fetchYesterdayImage} // Pass function
          yesterdayImage={yesterdayImage} // Pass state
        />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;
