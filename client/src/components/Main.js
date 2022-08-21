import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MenuList from "./menu/MenuList";
import Item from "./item/Item";
import Login from "./login/Login";
import EditMenus from "./admin/EditMenus";
import AddMenus from "./admin/AddMenus";
import ManageDishes from "./admin/ManageDishes";
import Actions from "./admin/Actions";
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
      <Route path="/admin" element={<Actions />} />
      <Route path="/admin/menus/manage" element={<EditMenus /> } />
      <Route path="/admin/menus/add" element={<AddMenus />} />
      <Route path="/admin/menu/additem/:title" element={<AddItemForm title={editTitle} />} />
      <Route path="/admin/dishes/manage" element={<ManageDishes />} />
      <Route path="/admin/edit/:title" element={<EditMenuForm title={editTitle} />} />
      <Route path="/admin/dishes/create" element={<CreateItemForm />} />
    </Routes>
  );
};

export default Main;
