import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function Admin() {
  const [Admin, setAdmin] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getData = () => {
    fetch("http://localhost:8080/menu/all")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAdmin(res);
      });
  };

  const sortNames = [...Admin].sort((a, b) => (a.title > b.title ? 1 : -1));

  const renderImage = (image) => {
    return (
      <div>
        <img
          onClick={() => setIsOpen(true)}
          src={`data:image/jpeg;base64,${image}`}
          className="admin-photo"
        />
        {isOpen && (
          <Lightbox
            mainSrc={`data:image/jpeg;base64,${image}`}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <table className="table" id="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Availability</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {sortNames.map((menu) => {
              const { id, type, title, availableFrom, availableUntil, image } =
                menu;
              return (
                <tr key={title}>
                  <td>{title}</td>
                  <td>{type}</td>
                  <td>{availableFrom + " - " + availableUntil}</td>
                  <td>{image != null ? renderImage(image) : "No image"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
