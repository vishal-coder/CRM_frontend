import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { socket } from "../context/socket";
import "./css/sidebar.css";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    alert("sidebar");
    socket.on("connect", () => {});
    socket.on("user added", (data) => {
      console.log("user added", data);
      // dispatch(addNewpost(data.fullDocument));
      // toast.success("New user  added to list");
    });
    socket.on("new lead", (data) => {
      console.log("lead added", data);
      toast.success("New Lead  added by user ");
    });
    socket.on("new contact", (data) => {
      console.log("contact added--", data);
      toast.success("New Contact added by user ");
    });

    return () => {
      socket.off("new lead");
      socket.off("new contact");
    };
  }, []);
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
      <NavLink
        to="serviceDashboard"
        className={({ isActive }) =>
          isActive ? "link-active sidebarItem" : "link sidebarItem"
        }
      >
        Service Dashboard
      </NavLink>
      {/* {user && user.userType != "Employee" ? null : null} */}
    </nav>
  );
}

export default Sidebar;
