import React, {useState, useEffect} from "react";

export default function MenusData() {
  const [Menus, fetchMenus] = useState([])

  const getData = () => {
    fetch('http://localhost:8080/menu/active/true')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        fetchMenus(res)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (<div className="section-center">
    {Menus.map((menu) => {
      const { id, type, title, img, availableFrom, availableUntil } = menu;
      return (
        <article key={id} className="menu-element">
          <img src={img} alt={title} className="photo" />
          <div className="item-info">
            <header>
              <h4>{title}</h4>
            </header>
            <h4 className="price-availability">Between {availableFrom} - {availableUntil}</h4>
            <p className="item-text">{type}</p>
          </div>
        </article>
      );
    })}
  </div>
  )
}
