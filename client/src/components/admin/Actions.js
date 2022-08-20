import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";

export default function Actions() {
  return (
    <div class="cards">
      <h2>Available actions</h2>
      <div class="services">
        <div class="content content-1">
          <h2>Manage menus</h2>
          <p class="cards-par">
            Following page allows you to manage existing menus. You can change
            its type, time available or upload a new image. Also, you can
            archive/unarchive menu or add dishes to it.
          </p>
          <Link to="/admin/menus/manage">Continue</Link>
        </div>
        <div class="content content-2">
          <h2>Add menus</h2>
          <p class="cards-par">Following page allows you to add new menus.</p>
          <Link to="/admin/menus/add">Continue</Link>
        </div>
        <div class="content content-3">
          <h2>Manage dishes</h2>
          <p class="cards-par">
            Following page allows you to add new and delete existing dishes.
          </p>
          <Link to="/admin/dishes/manage">Continue</Link>
        </div>
      </div>
      <div class="cards-footer">
        <Footer />
      </div>
    </div>
  );
}
