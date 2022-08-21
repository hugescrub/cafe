import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../../utils/Sidebar";
import Footer from "../Footer";

const CreateItemForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [requestAccepted, setRequestAccepted] = useState(true);

  const onNameChange = (e) => setName(e.target.value);
  const onPriceChange = (e) => setPrice(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'));
  const onDescriptionChange = (e) => setDescription(e.target.value);

  const options = [
    { value: "CLASSIC", label: "Classic" },
    { value: "FRENCH", label: "French" },
    { value: "ITALIAN", label: "Italian" },
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
    setItemType(newValue.value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const data = { name, description, itemType, image, price };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + localStorage.getItem("data"),
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/items/add", requestOptions)
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
              <h1>Adding new item</h1>
              <h6>Item name</h6>
              <input
                name="name"
                type="text"
                placeholder="Item name"
                className="text"
                id="name"
                value={name}
                onChange={onNameChange}
                required
              />
              <h6>Description</h6>
              <input
                name="description"
                type="text"
                placeholder="Description"
                className="text"
                id="description"
                value={description}
                onChange={onDescriptionChange}
                required
              />
              <h6>Price</h6>
              <input
                name="price"
                type="text"
                placeholder="Price"
                className="text"
                min={0}
                max={10000}
                id="price"
                value={price}
                onChange={onPriceChange}
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
      <div class="addForm-footer">
        <Footer />
      </div>
    </div>
  );
};

export default CreateItemForm;
