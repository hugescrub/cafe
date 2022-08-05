import React, {useState, useEffect} from "react";

export default function Menu(props) {
  const [Menu, setMenu] = useState([]);

  const { id, type, title, img, availableFrom, availableUntil, items } = props.menu;

  const getData = () => {
    fetch('http://localhost:8080/menu/' + title)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMenu(res);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (<div className="section-center">
        <article key={id} className="menu-item">
          <img src={img} alt={title} className="photo" />
          <div className="item-info">
            <header>
              <h4>{title}</h4>
            </header>
            <h4 className="price-availability">Between {availableFrom} - {availableUntil}</h4>
            <p className="item-text">{type}</p>
            <p> {items} </p>
          </div>
        </article>
  </div>
  )
}
