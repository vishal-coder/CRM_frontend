import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./css/sidebar.css";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="flex-column sidebar">
      {user && user.userType != "Employee" ? (
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
        to="addLead"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        Add Leads
      </NavLink>
      <NavLink
        to="leadDashboard"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        All Leads
      </NavLink>

      <NavLink
        to="contactDashboard"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        All Contact
      </NavLink>
      {user && user.userType != "Employee" ? (
        <NavLink
          to="serviceDashboard"
          className={({ isActive }) =>
            isActive ? "link-active sidebarItem" : "link sidebarItem"
          }
        >
          Service Dashboard
        </NavLink>
      ) : null}
    </nav>
  );
}

export default Sidebar;
