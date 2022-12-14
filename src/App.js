import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword.js";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/AddUserPage";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import VerifyToken from "./components/VerifyToken";
import UserDashboard from "./components/UserDashboard";
import AddUserPage from "./components/AddUserPage";
import AddLead from "./components/AddLead";
import LeadDashboard from "./components/LeadDashboard";
import ContactDashboard from "./components/ContactDashboard";
import ServiceDashboard from "./components/ServiceDashboard.js";
import AddServiceRequest from "./components/AddServiceRequest";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyToken" element={<VerifyToken />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="paymentPage" element={<PaymentPage />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="userDashboard" element={<UserDashboard />} />
          <Route path="addUserPage" element={<AddUserPage />} />
          <Route path="addLead" element={<AddLead />} />
          <Route path="leadDashboard" element={<LeadDashboard />} />
          <Route path="contactDashboard" element={<ContactDashboard />} />
          <Route path="serviceDashboard" element={<ServiceDashboard />} />
          <Route
            path="addServiceRequest/:email"
            element={<AddServiceRequest />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
