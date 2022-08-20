import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import { Link } from "react-router-dom";
import "react-image-lightbox/style.css";
import Sidebar from "../../utils/Sidebar";
import Footer from "../Footer";

export default function ManageDishes() {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [tableChanged, setTableChanged] = useState(false);

  const getData = () => {
    fetch("http://localhost:8080/items/all")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setItems(res);
      });
  };

  const sortNames = [...items].sort((a, b) => (a.name > b.name ? 1 : -1));

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

  const removeAction = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + localStorage.getItem("data"),
      },
    };

    fetch("http://localhost:8080/items/remove/" + id, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
      .then((res) => {
        tableChanged ? setTableChanged(false) : setTableChanged(true);
        console.log(res);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const removeButton = (id) => {
    return (
      <button
        style={{ backgroundColor: "rgba(149, 11, 11, 1)", width: "97px" }}
        className="button"
        onClick={() => removeAction(id)}
      >
        Remove
      </button>
    );
  };

  useEffect(() => {
    getData();
  }, [tableChanged]);

  return (
    <div>
      <Sidebar />
      <div className="table-container">
        <table className="table" id="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th className="image-th">Image (click to open fullsize)</th>
              <th>Price</th>
              <th style={{ width: "100px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortNames.map((item) => {
              const { id, name, price, itemType, description, image } = item;
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td className="item-desc-td">{description}</td>
                  <td>{itemType}</td>
                  <td className="table-image">
                    {image != null ? renderImage(image) : "No image"}
                  </td>
                  <td className="item-price-td">{price}&nbsp;₽</td>
                  {removeButton(id)}
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
