import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import Sidebar from "../../utils/Sidebar";
import Footer from "../Footer";

export default function ManageDishes() {
  const [items, setItems] = useState([]);
  const [tableChanged, setTableChanged] = useState(false);

  const getData = () => {
    fetch("http://localhost:8080/items/all")
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
      });
  };

  const sortNames = [...items].sort((a, b) => (a.name > b.name ? 1 : -1));

  const renderModalImage = (image) => {
    return (
      <div className="modal-image">
        <ModalImage
          className="admin-photo"
          small={`data:image/jpeg;base64,${image}`}
          large={`data:image/jpeg;base64,${image}`}
          alt="No image"
        />
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
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const removeButton = (id) => {
    return (
      <td>
        <button
          style={{ backgroundColor: "rgba(149, 11, 11, 1)" }}
          className="button"
          onClick={() => removeAction(id)}
        >
          Remove
        </button>
      </td>
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
              <th style={{ width: "100px" }}>Type</th>
              <th className="image-th" style={{ width: "240px" }}>
                Image (click to open fullsize)
              </th>
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
                    {image != null ? renderModalImage(image) : "No image"}
                  </td>
                  <td className="item-price-td">{price}&nbsp;₽</td>
                  {removeButton(id)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="shared-footer">
        <Footer />
      </div>
    </div>
  );
}
