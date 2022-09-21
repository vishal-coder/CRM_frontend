import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../services/UserService.js";

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

  const handleDelete = async (rowIndex) => {
    alert("inside handledelete");
    console.log("data", rowIndex);
    const updatedList = userlist.filter((item, index) => {
      return index != rowIndex;
    });
    const deleteItem = userlist.filter((item, index) => {
      return index == rowIndex;
    });
    console.log("deleteItem", deleteItem[0].username);
    const response = await deleteUser({ username: deleteItem[0].username });
    if (response.success) {
      setUserlist(updatedList);
      toast.success("User deleted successfully");
    } else {
      toast.warning("Please try again later");
    }
  };
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
    {
      name: "",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (rowIndex) => {
          return (
            <button
              onClick={(e) => {
                alert("clicked");
                console.log(rowIndex);
                handleDelete(rowIndex);
              }}
            >
              Delete
            </button>
          );
        },
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
        "it seems that list is empty.."
      )}
    </div>
  );
}

export default UserDashboard;
