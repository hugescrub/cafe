import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuList from "./MenuList";
import Item from "./Item";

const Main = () => {

  return (
    <Routes>
      <Route path="/" element={<MenuList />} />
      <Route path="/items/:id" element={<Item item/>} />
    </Routes>
  );
};

export default Main;
