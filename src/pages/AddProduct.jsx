import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import AddProductForm from "../components/AddProductForm";
import { addProduct } from "../api/models/produk";

const AddProduct = () => {
  useEffect(() => {
    document.title = "Renew Store | Tambah Produk";
  }, []);
  const navigate = useNavigate();
  const [errorMsgName, setErrorMsgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const addProductHandler = async (name, sell_price, stock) => {
    setIsLoading(true);
    try {
      await addProduct({ name, sell_price, stock });
      alert("Produk berhasil ditambahkan");
      navigate("/produk");
    } catch (error) {
      const message = error.response.data.message;
      if (message == "Validasi gagal") setErrorMsgName("Produk sudah ada");
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Dashboard />
          <div className="layout-page">
            <Navbar />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">Produk /</span> Tambah
                  Produk
                </h4>
                <AddProductForm
                  onAddProduk={addProductHandler}
                  errMsgName={errorMsgName}
                  isLoading={isLoading}
                />
              </div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
};

export default AddProduct;
