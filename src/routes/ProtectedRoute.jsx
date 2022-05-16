import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useKaryawanContext } from "../context/karyawanContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useKaryawanContext();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;