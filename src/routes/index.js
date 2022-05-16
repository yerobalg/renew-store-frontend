import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { KaryawanWrapper } from "../context/karyawanContext";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Index from "../pages/Index";
import AddProduct from "../pages/AddProduct";
import UpdateProduct from "../pages/UpdateProduct";
import Transaction from "../pages/Transaction";
import Transactions from "../pages/Transactions";
import Invoice from "../pages/Invoice";
import NotFound from "../pages/NotFound";

const Routers = () => {
  return (
    <BrowserRouter>
      <KaryawanWrapper>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/produk" />} />
            <Route path="/produk" element={<Index />} />
            <Route path="/tambah-produk" exact element={<AddProduct />} />
            <Route
              path="/ubah-produk/:slug"
              exact
              element={<UpdateProduct />}
            />
            <Route path="/tambah-transaksi" exact element={<Transaction />} />
            <Route path="/transaksi" exact element={<Transactions />} />
            <Route path="/invoice/:id" exact element={<Invoice />} />
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
