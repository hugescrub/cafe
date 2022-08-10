import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = ({ categories, activeCategory }) => {

  function refreshPage() {
    document.location.reload(true);
  }

  return (
    <div className="btn-container">
      {categories.map((category, index) => {
        return (
          <Link to={"/menus/" + category}>
            <button
              type="button"
              className={`${
                activeCategory === category ? "filter-btn active" : "filter-btn"
              }`}
              key={index}
              onClick={() => refreshPage()}
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
