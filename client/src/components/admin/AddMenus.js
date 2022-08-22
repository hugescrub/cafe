import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../utils/Sidebar";
import Footer from "../Footer";

export default function AddMenus() {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [requestAccepted, setRequestAccepted] = useState(true);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onAvailableFromChange = (e) => setAvailableFrom(e.target.value);
  const onAvailableUntilChange = (e) => setAvailableUntil(e.target.value);

  const options = [
    { value: "BREAKFAST", label: "Breakfast" },
    { value: "LUNCH", label: "Lunch" },
    { value: "DINNER", label: "Dinner" },
    { value: "GENERIC", label: "Generic" },
  ];

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToString(file);
    setImage(base64.substr(base64.indexOf(",") + 1));
  };

  const convertToString = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = (newValue, actionMeta) => {
    console.group("Type set:");
    console.log(newValue);
    setType(newValue.value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const data = { title, availableFrom, availableUntil, type, image };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + localStorage.getItem("data"),
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/menu/add", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          setRequestAccepted(true);
          navigate(-1);
          return res.json();
        }
      })
      .catch((error) => {
        setRequestAccepted(false);
        console.log("error: " + error);
      });
  };

  return (
    <div style={{marginTop: "-30px"}}>
      <Sidebar />
      <div className="selector-wrapper">
        <section className="edit-form-p">
          <div>
            <form>
              <h1>Adding new menu</h1>
              <h6>Title</h6>
              <input
                name="title"
                type="text"
                placeholder="Title"
                className="text"
                id="title"
                value={title}
                onChange={onTitleChange}
                required
              />
              <h6>Time from</h6>
              <input
                name="availableFrom"
                type="time"
                min="08:00 AM"
                max="10:00 PM"
                placeholder="From (i.e. 08:00)"
                className="text"
                id="availableFrom"
                value={availableFrom}
                onChange={onAvailableFromChange}
                required
              />
              <h6>Time until</h6>
              <input
                name="availableUntil"
                type="time"
                min="08:00"
                max="22:00"
                placeholder="Until (i.e. 12:00)"
                className="text"
                id="availableUntil"
                value={availableUntil}
                onChange={onAvailableUntilChange}
                required
              />
              <h6>Type</h6>
              <Select onChange={handleChange} options={options} />

              <input
                className="inputfile"
                name="file"
                id="file"
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
              <label for="file">Upload image</label>
              <button className="button-edit" onClick={handleAdd}>
                Submit
              </button>
              {requestAccepted ? <></> : <p>Please, fill out the fields.</p>}
            </form>
          </div>
        </section>
      </div>
      <div className="addForm-footer">
        <Footer />
      </div>
    </div>
  );
}
