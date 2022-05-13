import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useKaryawanContext } from "../context/karyawanContext";

const AuthRoute = () => {
  const { isAuthenticated } = useKaryawanContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;