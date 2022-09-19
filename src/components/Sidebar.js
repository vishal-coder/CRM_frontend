import { Link, NavLink } from "react-router-dom";
import "./css/sidebar.css";

function Sidebar() {
  return (
    <nav className="flex-column sidebar">
      <NavLink
        to="forgotpassword"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        Users
      </NavLink>
      <NavLink
        to="register"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        Leads
      </NavLink>
      <NavLink
        to="register1"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        Contacts
      </NavLink>
    </nav>
  );
}

export default Sidebar;
