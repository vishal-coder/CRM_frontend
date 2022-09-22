import { Navigate } from "react-router-dom";

import React from "react";

import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
