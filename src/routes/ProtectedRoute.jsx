import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useKaryawanContext } from "../context/karyawanContext";

const ProtectedRoute = () => {
  const { isAuthenticated, karyawanInfo } = useKaryawanContext();

  // console.log(karyawanInfo);

  if (isAuthenticated) {
    return <Outlet />;
  }

  console.warn("Login required");
  return <Navigate to="/login" />;
};

export default ProtectedRoute;