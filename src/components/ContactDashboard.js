import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { deleteLead, getLead, MarkAsContact } from "../services/LeadService.js";
import "./css/userdashboard.css";
import { getContacts } from "../services/contactService.js";
import { Navigate, useNavigate } from "react-router-dom";

function ContactDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [contactlist, setContactlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      console.log("getcontacts called");
      const response = await getContacts(
        {
          username: user.email,
          userType: user.userType,
        },
        user.token
      );
      console.log("response is", response);
      if (user.userType === "Manager") {
        const list = response.contacts.map((contact) => contact.contactList);
        console.log("updated list is", list);
        setContactlist(list);
      } else {
        setContactlist(response.contacts);
      }
    }
    getData();
  }, []);

  const handleMarkAsContact = async (rowIndex) => {
    const updatedList = contactlist.filter((item, index) => {
      return index != rowIndex;
    });
    const selectedItem = contactlist.filter((item, index) => {
      return index == rowIndex;
    });

    const response = await MarkAsContact({ id: selectedItem[0]._id });
    if (response.success) {
      setContactlist(updatedList);
      toast.success("contact deleted successfully");
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
      name: "status",
      label: "Status",
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowData[tableMeta.columnIndex - 1] ===
            "Payment Done" ? (
            <button
              onClick={(e) => {
                navigate(
                  `/dashboard/addServiceRequest/${tableMeta.rowData[2]}`
                );
              }}
            >
              Service Request
            </button>
          ) : (
            <button
              onClick={(e) => {
                handleMarkAsContact(tableMeta.rowIndex);
              }}
            >
              Payment Link
            </button>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    print: false,
  };

  return (
    <div className="listdashboard">
      {contactlist && contactlist.length > 0 ? (
        <MUIDataTable
          title={"Contact List"}
          data={contactlist}
          columns={columns}
          options={options}
        />
      ) : (
        "it seems that Contact list is empty.."
      )}
    </div>
  );
}

export default ContactDashboard;
