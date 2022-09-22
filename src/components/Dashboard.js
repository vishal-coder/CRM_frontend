import React from "react";
import { Outlet } from "react-router-dom";
import "./css/dashboard.css";
import "./css/dashboarddetails.css";
import Sidebar from "./Sidebar";

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
