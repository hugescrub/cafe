import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Footer from "../Footer";
import EditMenuModal from "./EditMenuModal";

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
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav" id="menu">
            <li>
              <a href="/admin/menus/edit">Edit menus</a>
            </li>
            <li>
              <a href="/admin/menus/manage">Manage menus</a>
            </li>
            <li>
              <a href="/admin/dishes/manage">Manage dishes</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="table-container">
        <table className="table" id="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Availability</th>
              <th>Image</th>
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
                    <EditMenuModal menu={menu}/>
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
