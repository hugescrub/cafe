import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import "react-image-lightbox/style.css";
import Sidebar from "../../utils/Sidebar";
import Footer from "../Footer";

export default function EditMenus() {
  const [EditMenus, setEditMenus] = useState([]);
  const [archiveTriggered, setArchiveTriggered] = useState(false);

  const getData = () => {
    fetch("http://localhost:8080/menu/all")
      .then((res) => res.json())
      .then((res) => {
        setEditMenus(res);
      });
  };

  const sortNames = [...EditMenus].sort((a, b) => (a.title > b.title ? 1 : -1));

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

  const archiveAction = (action, title) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + localStorage.getItem("data"),
      },
    };

    fetch("http://localhost:8080/menu/" + action + "/" + title, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
      .then((res) => {
        archiveTriggered
          ? setArchiveTriggered(false)
          : setArchiveTriggered(true);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const archiveButton = (active, title) => {
    if (active) {
      return (
        <button
          style={{ backgroundColor: "rgba(149, 11, 11, 1)", width: "97px" }}
          className="button"
          onClick={() => archiveAction("archive", title)}
        >
          Archive
        </button>
      );
    } else {
      return (
        <button
          style={{ backgroundColor: "rgba(11, 149, 11, 1)" }}
          className="button"
          onClick={() => archiveAction("unarchive", title)}
        >
          Unarchive
        </button>
      );
    }
  };

  useEffect(() => {
    getData();
  }, [archiveTriggered]);

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
              const {
                id,
                type,
                title,
                availableFrom,
                availableUntil,
                image,
                active,
              } = menu;
              return (
                <tr
                  key={id}
                  className={active ? "active-menu" : "inactive-menu"}
                >
                  <td>{title}</td>
                  <td>{type}</td>
                  <td>{availableFrom + " - " + availableUntil}</td>
                  <td className="table-image">
                    {image != null ? renderModalImage(image) : "No image"}
                  </td>
                  <td className="actions-td">
                    <Link to={"/admin/edit/" + title}>
                      <button
                        style={{ backgroundColor: "rgba(0, 89, 255, 0.76)" }}
                        className="button"
                      >
                        Edit
                      </button>
                    </Link>
                    <div className="space" />
                    <Link to={"/admin/menu/additem/" + title}>
                      <button
                        style={{ backgroundColor: "rgba(227, 137, 31, 1)" }}
                        className="button"
                      >
                        Add dishes
                      </button>
                    </Link>
                    <div className="space" />
                    {archiveButton(active, title)}
                  </td>
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
