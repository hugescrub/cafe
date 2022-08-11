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
        <Categories categories={categories} activeCategory={activeCategory} />
        <Main />
      </section>
      <footer-section class="footer-distributed">
        <div class="footer-right">
          <a href="https://github.com/hugescrub">Github</a>
        </div>

        <div class="footer-left">
          <p class="footer-links">
            <a class="link-1" href="/">
              Home
            </a>
            <a href="/authorize">Authorize</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </p>
          <p>Hugescrub &copy; 2022</p>
        </div>
      </footer-section>
    </main>
  );
}
