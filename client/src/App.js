import React, { useState } from "react";
import Categories from "./components/Categories";
import Main from "./components/Main";
import logo from "./logo.JPG";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("");
  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Generic"];
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
        />
        <Main />
      </section>
    </main>
  );
}
