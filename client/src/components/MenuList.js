import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Modal from "../modal/Modal";

export default function MenuList() {
  const ACTIVE_FLAG = "/true";
  const INACTIVE_FLAG = "/false";
  const [MenuList, setMenuList] = useState([]);

  const getData = () => {
    fetch("http://localhost:8080/menu/active" + INACTIVE_FLAG)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMenuList(res);
      });
  };

  function handleClick(menu) {
    console.log(menu);
    return <Menu menu={menu} />;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="section-center">
      {MenuList.map((menu) => {
        const { id, type, title, img, availableFrom, availableUntil } = menu;
        return (
          <article key={id} className="menu-element">
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
              </header>
              <h4 className="price-availability">
                Between {availableFrom} - {availableUntil}
              </h4>
              <p className="item-text">{type}</p>
              <button className="button" onClick={() => handleClick(menu)}>
                Callback
              </button>
              <Modal menu={menu} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
