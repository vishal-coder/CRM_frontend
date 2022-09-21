import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../services/UserService.js";
import { toast } from "react-toastify";

import "./css/userdashboard.css";
import { useSelector } from "react-redux";
import { deleteLead, getLead } from "../services/LeadService.js";

function LeadDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [leadlist, setLeadlist] = useState([]);

  useEffect(() => {
    async function getData() {
      console.log("getleads called");
      const response = await getLead(
        {
          username: user.email,
          userType: user.userType,
        },
        user.token
      );
      if (user.userType === "Manager") {
        const list = response.leads.map((lead) => lead.leads);
        setLeadlist(list);
      } else {
        setLeadlist(response.leads);
      }
    }
    getData();
  }, []);

  const handleDelete = async (rowIndex) => {
    alert("inside handledelete");
    console.log("data", rowIndex);
    const updatedList = leadlist.filter((item, index) => {
      return index != rowIndex;
    });
    const deleteItem = leadlist.filter((item, index) => {
      return index == rowIndex;
    });
    console.log("deleteItem", deleteItem);
    const response = await deleteLead({ id: deleteItem[0]._id });
    if (response.success) {
      setLeadlist(updatedList);
      toast.success("Lead deleted successfully");
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
      name: "email",
      label: "email",
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
      name: "createdBy",
      label: "Created By",
      body: { booleanChecker },

      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "source",
      label: "Source",
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
    <div className="Leaddashboard">
      {leadlist && leadlist.length > 0 ? (
        <MUIDataTable
          title={"Employee List"}
          data={leadlist}
          columns={columns}
          options={options}
        />
      ) : (
        "it seems that list is empty.."
      )}
    </div>
  );
}

export default LeadDashboard;
