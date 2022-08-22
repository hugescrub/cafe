import React from "react";
import { Link } from "react-router-dom";

const Categories = ({ categories, activeCategory }) => {
  return (
    <div className="btn-container">
      {categories.map((category) => {
        return (
          <Link to={"/menus/" + category}>
            <button
              type="button"
              className={`${
                activeCategory === category ? "filter-btn active" : "filter-btn"
              }`}
            >
              {category}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
