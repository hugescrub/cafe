import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MenuList from "./MenuList";
import Item from "./Item";
import Login from "./login/Login"

const Main = () => {
  const location = useLocation();
  const searchType = useLocation()
    .pathname.substring(location.pathname.lastIndexOf("/") + 1)
    .toUpperCase();

  return (
    <Routes>
      <Route path="/" element={<MenuList type="ALL" />} />
      <Route path="/menus/:type" element={<MenuList type={searchType} />} />
      <Route path="/items/:id" element={<Item item />} />
      <Route path="/authorize" element={<Login />}/> {/* Put actual page component here */}
    </Routes>
  );
};

export default Main;
