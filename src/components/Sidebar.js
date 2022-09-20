import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./css/sidebar.css";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="flex-column sidebar">
      {user.userType != "Employee" ? (
        <>
          {" "}
          <NavLink
            to="addUserPage"
            className={({ isActive }) =>
              isActive ? "link-active sidebarItem" : "link sidebarItem"
            }
          >
            Add User
          </NavLink>
          <NavLink
            to="userDashboard"
            className={({ isActive }) =>
              isActive ? "link-active sidebarItem" : "link sidebarItem "
            }
          >
            All Users
          </NavLink>
        </>
      ) : null}

      <NavLink
        to="register"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        Create Leads
      </NavLink>
      <NavLink
        to="register"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        All Leads
      </NavLink>
      <NavLink
        to="register1"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        Create Contacts
      </NavLink>
      <NavLink
        to="register1"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        All Contact
      </NavLink>
      {user.userType != "Employee" ? (
        <NavLink
          to="addUserPage"
          className={({ isActive }) =>
            isActive ? "link-active sidebarItem" : "link sidebarItem"
          }
        >
          Payment Status
        </NavLink>
      ) : null}
    </nav>
  );
}

export default Sidebar;
