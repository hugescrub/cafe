import React, { useState } from "react";
import Items from './Items';
import Categories from "./Categories";
import MenuList from "./MenuList";
import Menu from "./Menu";
import items from "./data";
import logo from "./logo.JPG";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

export default function App() {

    const [menus] = useState([]);
    const [menuItems, setMenuItems] = useState(items);
    const [activeCategory, setActiveCategory] = useState("");
    const [categories, setCategories] = useState(allCategories);

    const filterItems = (category) => {
      setActiveCategory(category);
      if (category === "all") {
        return;
      }
      const newItems = items.filter((item) => item.category === category);
    };
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <img src={logo} alt="logo" className="logo" />
          <h2>Menu List</h2>
          <div className="underline"></div>
        </div>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          filterItems={filterItems}
        />
        <MenuList menus={menus} />
      </section>
    </main>
  );
};
