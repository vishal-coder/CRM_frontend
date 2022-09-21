import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllServiceRequest,
  updateRequestStatus,
} from "../services/ServiceRequestUtiility.js";

import { useSelector } from "react-redux";
import "./css/userdashboard.css";
import { formatDate } from "../services/UtilityService.js";

function UserDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [servicelist, setServicelist] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await getAllServiceRequest(
        {
          username: user.email,
          userType: user.userType,
        },
        user.token
      );

      // setServicelist(response.serviceReq);
      console.log("response of getAllServiceRequest is", response);
      if (user.userType === "Manager") {
        const list = response.serviceReq.map((service) => service.serviceReq);
        console.log("updated list is", list);
        setServicelist(list);
      } else {
        setServicelist(response.contacts);
      }
    }
    getData();
  }, []);

  const handleUpdateRequestStatus = async (_id) => {
    console.log("inside handleUpdateRequestStatus", _id);
    const response = await updateRequestStatus({ id: _id });
    const updatedList = servicelist.filter((item) => {
      return item._id === _id ? (item.status = "Closed") : item;
    });
    if (response.success) {
      toast.success("Status Updated  successfully");
      setServicelist(updatedList);
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
      name: "email",
      label: "Customer",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
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
      name: "priority",
      label: "Pririty",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "createdOn",
      label: "Created On",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return formatDate(value);
        },
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log();
          return value === "Closed" ? (
            value
          ) : (
            <button
              onClick={(e) => {
                handleUpdateRequestStatus(tableMeta.rowData[0]);
              }}
            >
              Close Request
            </button>
          );
        },
        // customBodyRender: (value, tableMeta, updateValue) => {
        //   return (
        //     <button
        //       onClick={(e) => {
        //         handleUpdateRequestStatus(tableMeta.rowData[0]);
        //       }}
        //     >
        //       Service Request
        //     </button>
        //   );
        // },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <div className="userdashboard">
      {servicelist && servicelist.length > 0 ? (
        <MUIDataTable
          title={"Service Request List"}
          data={servicelist}
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
