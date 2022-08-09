import React, {useState, useEffect} from "react";

export default function Items() {
  const [Items, setItems] = useState([]);

  const getData = () => {
    fetch('http://localhost:8080/items/all')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setItems(res);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (<div className="section-center">
    {Items.map((item) => {
      const { id, name, img, price, itemType } = item;
      return (
        <article key={id} className="menu-item">
          <img src={img} alt={name} className="photo" />
          <div className="item-info">
            <header>
              <h4>{name}</h4>
              <h4 className="price-availability">&nbsp;{price}₽</h4>
            </header>
            <p className="item-text">{itemType} CATEGORY</p>
          </div>
        </article>
      );
    })}
  </div>
  )
}
