import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./item.css";

export default function Item() {
  const [Item, setItem] = useState([]);
  const { id, name, price, itemType, img, description, content } = Item;

  const location = useLocation();
  const searchId = useLocation().pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const getData = () => {
    fetch("http://localhost:8080/items?id=" + searchId)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setItem(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="item-page">
      <div className="details" key={id}>
        <div className="big-img">
          <img src={img} alt="" />
        </div>
        <div className="box">
          <div className="row">
            <h2>{name}</h2>
            <span>{price}&nbsp;₽</span>
          </div>
          <p>{itemType}</p>
          <p>{description}</p>
          <p>{content}</p>
          <Link to="/">
            <button className="return">Return to menus</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
