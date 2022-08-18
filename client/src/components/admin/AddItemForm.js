import React, { useState, useEffect } from "react";
import Select from "react-select";

const AddItemForm = ({ title }) => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");

  const onItemNameChange = (e) => setItemName(e.target.itemName);

  const getItems = () => {
    fetch("http://localhost:8080/items/all")
      .then((res) => res.json())
      .then((res) => {
        console.log("ITEMS - " + res);
        setItems(res);
      });
  };

  useEffect(() => {
    getItems();
  }, [items]);

  return (
    <div>
      <div className="selector-wrapper">
        <section className="edit-form-p">
          <div>
            <form>
              <h1>{"Adding item to " + title  + "."}</h1>
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
              <Select></Select>

              <input
                name="itemName"
                type="text"
                placeholder="Item name (selector later)"
                className="text"
                id="itemName"
                value={itemName}
                onChange={onItemNameChange}
                required
              />
              <button className="button-edit" /*onClick={handleAdd}*/>
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
