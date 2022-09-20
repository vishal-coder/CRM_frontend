import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/UserService.js";

import "./css/userdashboard.css";
import { useSelector } from "react-redux";

function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [userlist, setUserlist] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await getAllUsers(
        {
          username: user.email,
          userType: user.userType,
        },
        user.token
      );

      setUserlist(response.users);
      console.log("response of users is", response);
    }
    getData();
  }, []);
  const booleanChecker = (rowData, item) => {
    if (typeof rowData[item.field] === "boolean") {
      return rowData[item.field] ? "Accepted" : "Unaccepted";
    } else {
      return rowData[item.field];
    }
  };
  const columns = [
    {
      name: "firstname",
      label: "Firstname",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "lastname",
      label: "Lastname",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "username",
      label: "username",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "isActive",
      label: "isActive",
      body: { booleanChecker },

      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "userType",
      label: "User Type",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <div className="userdashboard">
      {userlist && userlist.length > 0 ? (
        <MUIDataTable
          title={"Employee List"}
          data={userlist}
          columns={columns}
          options={options}
        />
      ) : (
        "Getting details.."
      )}
    </div>
  );
}

export default UserDashboard;
