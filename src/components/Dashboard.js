import React from "react";
import "./css/dashboard.css";
import DashboardDetails from "./DashboardDetails";
import Sidebar from "./Sidebar";
import "./css/dashboarddetails.css";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      {" "}
      <>
        <Sidebar />
        <div className="dashboarddetails">
          <Outlet />
        </div>
        {/* <DashboardDetails /> */}
      </>
    </div>
  );
}

export default Dashboard;
