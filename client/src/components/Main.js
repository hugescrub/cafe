import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MenuList from "./MenuList";
import Item from "./Item";
import Login from "./login/Login";
import EditMenus from "./admin/EditMenus";
import ManageMenus from "./admin/ManageMenus";
import ManageDishes from "./admin/ManageDishes";
import Actions from "./admin/Actions";
import Validate from "../utils/Validate";

const Main = () => {
  const location = useLocation();
  const searchType = useLocation()
    .pathname.substring(location.pathname.lastIndexOf("/") + 1)
    .toUpperCase();

  return (
    <Routes>
      {/*Public routes*/}
      <Route path="/" element={<MenuList type="ALL" />} />
      <Route path="/menus/:type" element={<MenuList type={searchType} />} />
      <Route path="/items/:id" element={<Item item/>} />
      <Route path="/authorize" element={<Login />} />

      {/*Private routes*/}
      <Route path="/admin" 
             element={localStorage.getItem("data") ? (
                Validate() ? <Actions /> : <Navigate to="/authorize" />
              ) : <Navigate to="/authorize" />} />
      <Route path="/admin/menus/edit" 
             element={localStorage.getItem("data") ? (
                Validate() ? <EditMenus /> : <Navigate to="/authorize" />
              ) : <Navigate to="/authorize" />} />
      <Route path="/admin/menus/manage" element={localStorage.getItem("data") ? <ManageMenus /> : <Navigate to="/authorize" />} />
      <Route path="/admin/dishes/manage" element={localStorage.getItem("data") ? <ManageDishes /> : <Navigate to="/authorize" />} />
    </Routes>
  );
};

export default Main;
