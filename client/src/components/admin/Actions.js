import React, { useState, useEffect } from "react";
import Footer from "../Footer"

export default function Actions() {
  return (
    <div class="cards">
      <h2>Available actions</h2>
      <div class="services">
        <div class="content content-1">
          <h2>Edit menus</h2>
          <p class="cards-par">
            Following page allows you to edit existing menus. Here you can change its type, time available or upload a new image. 
          </p>
          <a href="#">Continue</a>
        </div>
        <div class="content content-2">
          <h2>Manage menus</h2>
          <p class="cards-par">
            Following page allows you to add new menus, add existing dishes to menus and archive menus.
          </p>
          <a href="#">Continue</a>
        </div>
        <div class="content content-3">
          <h2>Manage dishes</h2>
          <p class="cards-par">
            Following page allows you to add new and delete existing dishes.
          </p>
          <a href="#">Continue</a>
        </div>
      </div>
      <div class="cards-footer">
       <Footer />
      </div>
    </div>
  );
}
