import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../services/contactService.js";
import { generatePaymentLink } from "../services/PaymentService.js";
import "./css/userdashboard.css";

function ContactDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [contactlist, setContactlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await getContacts(
        {
          username: user.email,
          userType: user.userType,
        },
        user.token
      );
      if (user.userType === "Manager") {
        const list = response.contacts.map((contact) => contact.contactList);
        setContactlist(list);
      } else {
        setContactlist(response.contacts);
      }
    }
    getData();
  }, []);

  const handleGeneratePaymentLink = async (rowIndex, rowData) => {
    const response = await generatePaymentLink({ id: rowData[0] });
    if (response.success) {
      alert(`Payment Link is - ${response.paymentLink}`);
      toast.success("Payment Link Generated successfully");
    } else {
      toast.warning("Please try again later");
    }
  };

  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
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
                handleGeneratePaymentLink(
                  tableMeta.rowIndex,
                  tableMeta.rowData
                );
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
    selectableRows: "none",
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
