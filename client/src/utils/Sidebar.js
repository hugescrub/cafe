import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav" id="menu">
            <li>
              <Link to="/admin/menus/edit">Edit menus</Link>
            </li>
            <li>
              <Link to="/admin/menus/manage">Manage menus</Link>
            </li>
            <li>
              <Link to="/admin/dishes/manage">Manage dishes</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;