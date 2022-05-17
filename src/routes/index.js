import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { KaryawanWrapper } from "../context/karyawanContext";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Spinner from "../components/Spinner";

const lazyRoutes = [
  {
    path: "/tambah-produk",
    exact: true,
    Element: lazy(() => import("../pages/AddProduct")),
  },
  {
    path: "/ubah-produk/:slug",
    exact: true,
    Element: lazy(() => import("../pages/UpdateProduct")),
  },
  {
    path: "/tambah-transaksi",
    exact: true,
    Element: lazy(() => import("../pages/Transaction")),
  },
  {
    path: "/transaksi",
    exact: true,
    Element: lazy(() => import("../pages/Transactions")),
  },
  {
    path: "/invoice/:id",
    exact: true,
    Element: lazy(() => import("../pages/Invoice")),
  },
];

const Routers = () => {
  return (
    <BrowserRouter>
      <KaryawanWrapper>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/produk" />} />
            <Route path="/produk" element={<Index />} />
            {lazyRoutes.map(({ path, exact, Element }, index) => (
              <Route
                key={index}
                path={path}
                exact={exact}
                element={
                  <Suspense
                    fallback={
                      <div className="container-xxl container-p-y">
                        <Spinner />
                      </div>
                    }
                  >
                    <Element />
                  </Suspense>
                }
              />
            ))}
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </KaryawanWrapper>
    </BrowserRouter>
  );
};

export default Routers;
