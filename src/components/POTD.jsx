import React, { useState } from "react";
import "./styles.css"; // Import the CSS file

const NASA_API_KEY = "process.env.NASAAPIKEY";

function NasaPhotoOfTheDay() {
  const [imageData, setImageData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar(open) {
    setIsSidebarOpen(open);
  }

  function getYesterdaysImage() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split("T")[0];

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${formattedDate}`)
      .then(response => response.json())
      .then(data => {
        setImageData(data);
      })
      .catch(error => console.error("Error fetching NASA image:", error));
  }

  return (
    <div className="app-container">

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={function () { toggleSidebar(false); }}>
          Close Menu
        </button>
        <button className="fetch-btn" onClick={getYesterdaysImage}>
          Get Yesterday's Image
        </button>
      </div>

  
      <button className="menu-btn" onClick={function () { toggleSidebar(true); }}>
        Open Menu
      </button>


      <div className="content">
        {imageData && (
          <div>
            <h2>{imageData.title}</h2>
            {imageData.media_type === "image" ? (
              <img src={imageData.url} alt={imageData.title} />
            ) : (
              <iframe
                title={imageData.title}
                src={imageData.url}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
            <p>{imageData.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NasaPhotoOfTheDay;
