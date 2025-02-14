import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  async function fetchAPIData(date = "") {
    const NASA_KEY = "HuIhGT0U9ZtIPuHyIKz1h8ybgAjyehsNDOVEuMKY";
    let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
    if (date) {
      url += `&date=${date}`; 
    }

    try {
      const res = await fetch(url);
      const apiData = await res.json();
      console.log(apiData);
      setData(apiData);
      console.log(date ? `Fetched data for ${date}` : "Fetched today's data");
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchAPIData(); 
  }, []);

  function fetchYesterdayPhoto() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split("T")[0];
    fetchAPIData(formattedDate); 
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
        <SideBar data={data} fetchYesterdayPhoto={fetchYesterdayPhoto} handleToggleModal={handleToggleModal} />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;