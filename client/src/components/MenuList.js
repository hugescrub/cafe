import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import Modal from "./modal/Modal";
import logo from "../logo.JPG";

export default function MenuList({ type }) {
  const ACTIVE_FLAG = "/true";
  const INACTIVE_FLAG = "/false";

  const [MenuList, setMenuList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Generic"];

  const getTypeData = () => {
    fetch("http://localhost:8080/menu?type=" + type)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMenuList(res);
      });
  };

  const getData = () => {
    fetch("http://localhost:8080/menu/active" + INACTIVE_FLAG)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMenuList(res);
      });
  };

  useEffect(() => {
    if (type === "ALL") {
      getData();
    } else {
      getTypeData();
    }
  }, [type]);

  return (
    <div className="menu-section-wrapper">
      <div>
        <section className="menu section">
          <div className="title">
            <img src={logo} alt="logo" className="logo" />
            <h2>Menu List</h2>
            <div className="underline"></div>
          </div>
          <Categories categories={categories} activeCategory={activeCategory} />
        </section>
      </div>
      <div className="section-center">
        {MenuList.map((menu) => {
          const { id, type, title, availableFrom, availableUntil, image } =
            menu;
          return (
            <article key={id} className="menu-element">
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt={title}
                className="photo"
              />
              <div className="item-info">
                <header>
                  <h4>{title}</h4>
                </header>
                <h4 className="price-availability">
                  Between {availableFrom} - {availableUntil}
                </h4>
                <p className="item-text-main">{type}</p>
                <Modal menu={menu} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
