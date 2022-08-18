import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import { Link } from "react-router-dom";
import "react-image-lightbox/style.css";
import Sidebar from "../../utils/Sidebar";
import Footer from "../Footer";

export default function EditMenus() {
  const [EditMenus, setEditMenus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getData = () => {
    fetch("http://localhost:8080/menu/all")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEditMenus(res);
      });
  };

  const sortNames = [...EditMenus].sort((a, b) => (a.title > b.title ? 1 : -1));

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
      <Sidebar />
      <div className="table-container">
        <table className="table" id="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Availability</th>
              <th className="image-th">Image (click to open fullsize)</th>
              <th>Actions</th>
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
                  <td className="table-image">
                    {image != null ? renderImage(image) : "No image"}
                  </td>
                  <td>
                    <Link to={"/admin/edit/" + title} >
                      <button className="button">Edit</button>
                    </Link>
                    <Link to ={"/admin/menu/additem/" + title}>
                      <button className="button">Add dishes</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div class="shared-footer">
        <Footer />
      </div>
    </div>
  );
}
