import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddItemForm = ({ title }) => {
  const [patchItems, setPatchItems] = useState();
  const [items, setItems] = useState([]);
  const [sendItems, setSendItems] = useState();
  const selectableItems = [];

  const getItems = () => {
    fetch("http://localhost:8080/items/pending?menuTitle=" + title)
      .then((res) => res.json())
      .then((res) => {
        res.map((item) => {
          const { id, name, description, image, itemType, price } = item;
          selectableItems.push({
            value: name,
            label: name,
            id: id,
            name: name,
            price: price,
            itemType: itemType,
            description: description,
            image: image,
          });
        });
        setItems(selectableItems);
      });
  };

  const handleChange = (sendItems, actionMeta) => {
    console.group("Items set:");
    console.log(sendItems);
    setSendItems(sendItems);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    const data = sendItems;
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + localStorage.getItem("data"),
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/menu/addItemList/" + title, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          navigate(-1);
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <div className="selector-wrapper">
        <section className="edit-form-p">
          <div>
            <form>
              <h1>{"Adding items to " + title}</h1>
              <h6>Menu name</h6>
              <input
                name="title"
                type="text"
                className="text"
                id="title"
                value={title}
                readOnly
              />
              <h6>Item name</h6>
              <Select
                isMulti
                onChange={handleChange}
                name="items"
                options={items}
              />
              <button className="button-edit-multi" onClick={handleAdd}>
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddItemForm;
