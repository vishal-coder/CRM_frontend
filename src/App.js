import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Single from "./components/DashboardDetails.js";
import createpost from "./components/CreatePost.js";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationSuccess from "./components/RegistrationSuccess";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import VerifyToken from "./components/VerifyToken";
import ForgotPassword from "./components/ForgotPassword.js";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="register" element={<Register />} />
          <Route path="register1" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="verifyEmail/:token" element={<VerifyEmail />} />
          <Route path="verifyToken" element={<VerifyToken />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
