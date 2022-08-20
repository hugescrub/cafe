import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MenuList from "./menu/MenuList";
import Item from "./item/Item";
import Login from "./login/Login";
import EditMenus from "./admin/EditMenus";
import AddMenus from "./admin/AddMenus";
import ManageDishes from "./admin/ManageDishes";
import Actions from "./admin/Actions";
import Validate from "../utils/Validate";
import EditMenuForm from "./admin/EditMenuForm";
import AddItemForm from "./admin/AddItemForm";
import CreateItemForm from "./admin/CreateItemForm";

const Main = () => {
  const location = useLocation();
  const searchType = useLocation()
    .pathname.substring(location.pathname.lastIndexOf("/") + 1)
    .toUpperCase();

  const editTitle = useLocation()
    .pathname.substring(location.pathname.lastIndexOf("/") + 1).replace("%20", " ")

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
      <Route path="/admin/menus/manage" 
             element={localStorage.getItem("data") ? (
                Validate() ? <EditMenus /> : <Navigate to="/authorize" />
              ) : <Navigate to="/authorize" />} />
              
      <Route path="/admin/menus/add" element={localStorage.getItem("data") ? <AddMenus /> : <Navigate to="/authorize" />} />
      <Route path="/admin/menu/additem/:title" element={<AddItemForm title={editTitle} />} />
      <Route path="/admin/dishes/manage" element={localStorage.getItem("data") ? <ManageDishes /> : <Navigate to="/authorize" />} />

      <Route path="/admin/edit/:title" element={localStorage.getItem("data") ? (
                Validate() ? <EditMenuForm title={editTitle}/>: <Navigate to="/authorize" />
              ) : <Navigate to="/authorize" />} />

      <Route path="/admin/dishes/create" element={localStorage.getItem("data") ? <CreateItemForm /> : <Navigate to="/authorize" />} />
    </Routes>
  );
};

export default Main;
