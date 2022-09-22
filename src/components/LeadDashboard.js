import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { deleteLead, getLead, MarkAsContact } from "../services/LeadService.js";
import "./css/userdashboard.css";

function LeadDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [leadlist, setLeadlist] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await getLead(
        {
          username: user.email,
          userType: user.userType,
        },
        user.token
      );
      if (user.userType === "Manager") {
        const list = response.leads
          .map((lead) => lead.leads)
          .filter(function (lead) {
            return lead.status !== "Marked As Contact";
          });
        setLeadlist(list);
      } else {
        setLeadlist(response.leads);
      }
    }
    getData();
  }, []);

  const handleDelete = async (rowIndex) => {
    const updatedList = leadlist.filter((item, index) => {
      return index != rowIndex;
    });
    const deleteItem = leadlist.filter((item, index) => {
      return index == rowIndex;
    });

    const response = await deleteLead({ id: deleteItem[0]._id });
    if (response.success) {
      setLeadlist(updatedList);
      toast.success("Lead deleted successfully");
    } else {
      toast.warning("Please try again later");
    }
  };

  const handleMarkAsContact = async (rowIndex) => {
    const updatedList = leadlist.filter((item, index) => {
      return index != rowIndex;
    });
    const selectedItem = leadlist.filter((item, index) => {
      return index == rowIndex;
    });

    const response = await MarkAsContact({ id: selectedItem[0]._id });
    if (response.success) {
      setLeadlist(updatedList);
      toast.success("Lead updated  successfully");
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
                handleMarkAsContact(rowIndex);
              }}
            >
              Mark As Contact
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
      {leadlist && leadlist.length > 0 ? (
        <MUIDataTable
          title={"Leads List"}
          data={leadlist}
          columns={columns}
          options={options}
        />
      ) : (
        "eithre their is no data or its taking more time to get details.."
      )}
    </div>
  );
}

export default LeadDashboard;
