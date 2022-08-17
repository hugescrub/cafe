import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EditMenuForm = ({ title }) => {
  const navigate = useNavigate();

  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const onAvailableFromChange = (e) => setAvailableFrom(e.target.value);
  const onAvailableUntilChange = (e) => setAvailableUntil(e.target.value);

  const options = [
    { value: "BREAKFAST", label: "Breakfast" },
    { value: "LUNCH", label: "Lunch" },
    { value: "DINNER", label: "Dinner" },
    { value: "GENERIC", label: "Generic" },
  ];

  const handleEdit = (e) => {
    console.log("Type: " + type);
    e.preventDefault();
    const data = { title, availableFrom, availableUntil, type, image };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + localStorage.getItem("data"),
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/menu/update", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        navigate("/admin/menus/edit");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const handleChange = (newValue, actionMeta) => {
    console.group("Type set:");
    console.log(newValue);
    setType(newValue.value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToString(file);
    console.log(base64);
    setImage(base64.replace("data:image/jpeg;base64,", ""));
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

  useEffect(() => {}, [type]);

  return (
    <div className="selector-wrapper">
      <section className="selector">
        <div>
          <form>
            <input
              name="availableFrom"
              type="text"
              placeholder="From (i.e. 08:00)"
              className="text"
              id="availableFrom"
              value={availableFrom}
              onChange={onAvailableFromChange}
              required
            />
            <input
              name="availableUntil"
              type="text"
              placeholder="Until (i.e. 12:00)"
              className="text"
              id="availableUntil"
              value={availableUntil}
              onChange={onAvailableUntilChange}
              required
            />
            <CreatableSelect
              isClearable
              onChange={handleChange}
              options={options}
            />
            <input
              type="file"
              onChange={(e) => {
                uploadImage(e);
              }}
            ></input>
            <button onClick={handleEdit}>Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditMenuForm;
