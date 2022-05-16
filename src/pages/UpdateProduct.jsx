import React, { useState, useEffect, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import AddProductForm from "../components/AddProductForm";
import Spinner from "../components/Spinner";
import { updateProduk, getProdukBySlug } from "../api/models/produk";

const UpdateProduct = () => {
  useEffect(() => {
    document.title = "Renew Store | Ubah Produk";
  }, []);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [produk, setProduk] = useState({});
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsgName, setErrorMsgName] = useState("");

  const getProdukFromApi = useCallback(async () => {
    setIsLoadingForm(true);
    try {
      const res = await getProdukBySlug(slug);
      setProduk(res.data.data);
    } catch (error) {
      alert("Produk tidak ditemukan");
    }
    setIsLoadingForm(false);
  }, []);

  useEffect(() => {
    getProdukFromApi();
  }, [getProdukFromApi]);

  const updateProductHandler = async (name, sell_price, stock) => {
    setIsLoading(true);
    try {
      await updateProduk(slug, { name, sell_price, stock });
      alert("Produk berhasil diubah");
      navigate("/produk");
    } catch (error) {
      const message = error.response.data.message;
      if (message == "Validation error") setErrorMsgName("Produk sudah ada");
    }
    setIsLoading(false);
  };

  const showForm = () => {
    if (isLoadingForm) return <Spinner />;
    return (
      <AddProductForm
        onAddProduk={updateProductHandler}
        errMsgName={errorMsgName}
        isLoading={isLoading}
        produk={produk}
      />
    );
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
                  <span className="text-muted fw-light">Produk /</span> Ubah
                  Produk
                </h4>
                {showForm()}
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

export default UpdateProduct;