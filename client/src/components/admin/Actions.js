import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";

export default function Actions() {
  return (
    <div className="cards">
      <h2>Available actions</h2>
      <div className="services">
        <div className="content content-1">
          <h2>Manage menus</h2>
          <p className="cards-par">
            Following page allows you to manage existing menus. You can change
            its type, time available or upload a new image. Also, you can
            archive/unarchive menu or add dishes to it.
          </p>
          <Link to="/admin/menus/manage">Continue</Link>
        </div>
        <div className="content content-2">
          <h2>Add menus</h2>
          <p className="cards-par">Following page allows you to add new menus.</p>
          <Link to="/admin/menus/add">Continue</Link>
        </div>
        <div className="content content-3">
          <h2>Manage dishes</h2>
          <p className="cards-par">
            Following page allows you to add new and delete existing dishes.
          </p>
          <Link to="/admin/dishes/manage">Continue</Link>
        </div>
      </div>
      <div className="cards-footer">
        <Footer />
      </div>
    </div>
  );
}
