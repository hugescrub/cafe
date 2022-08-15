import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MenuList from "./MenuList";
import Item from "./Item";
import Login from "./login/Login"
import Admin from "./admin/Admin"
import Actions from "./admin/Actions"

const Main = () => {
  const location = useLocation();
  const searchType = useLocation()
    .pathname.substring(location.pathname.lastIndexOf("/") + 1)
    .toUpperCase();

  return (
    <Routes>
      <Route path="/" element={<MenuList type="ALL" />} />
      <Route path="/menus/:type" element={<MenuList type={searchType} />} />
      <Route path="/items/:id" element={<Item item/>} />
      <Route path="/authorize" element={<Login />} />
      <Route path="/admin" element={localStorage.getItem('data') ? <Admin /> : <Navigate to="/authorize" />} />
      <Route path="/actions" element={<Actions />} />
    </Routes>
  );
};

export default Main;
