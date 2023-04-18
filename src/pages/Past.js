import React, { useEffect, useState } from "react";
import axios from "axios";

const Past = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const imageData = new FormData();
    imageData.append("email", email);
    axios
      .post("https://flask-production-8563.up.railway.app/past-predictions", imageData)
      .then(function (response) {
        setImages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {images.map((image) => (
        <div key={image._id}>
          <img
            src={`data:image/jpeg;base64,${image.image_b64}`}
            alt="Malaria cells"
          />
          <p>
            Actual Label: {image.alabel === "1" ? "Infected" : "Uninfected"}
          </p>
          <p>
            Predicted Label: {image.plabel === "1" ? "Infected" : "Uninfected"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Past;


