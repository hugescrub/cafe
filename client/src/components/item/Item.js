import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer";

export default function Item() {
  const [Item, setItem] = useState([]);
  const { id, name, price, itemType, description, image } = Item;

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
    <div>
      <div className="item-page">
        <div className="details" key={id}>
          <div className="big-img">
            <img src={`data:image/jpeg;base64,${image}`} />
          </div>
          <div className="box">
            <div className="row">
              <h2>{name}</h2>
              <span>{price}&nbsp;₽</span>
            </div>
            <p className="type">{itemType}</p>
            <p className="description">{description}</p>
            <Link to="/">
              <button className="return">Return to menus</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-itempage">
        <Footer />
      </div>
    </div>
  );
}
