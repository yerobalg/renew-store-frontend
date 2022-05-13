import React, { useState } from "react";
import TransactionList from "../components/TransactionList";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

const Transaction = () => {
  const baseProduct = {
    key: 1,
    keyword: "",
    stock: 0,
  };
  const [productToBuy, setProductToBuy] = useState([baseProduct]);
  const appendBaseProduct = () => {
    setProductToBuy([
      ...productToBuy,
      { ...baseProduct, key: productToBuy.length + 1 },
    ]);
    console.log(productToBuy.length);
  };
  const removeProduct = (newProduct) => {
    setProductToBuy([...newProduct]);
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
                  <span className="text-muted fw-light">Transaksi /</span>{" "}
                  Tambah Transaksi
                </h4>
                <TransactionList
                  productToBuy={productToBuy}
                  onAddProduct={appendBaseProduct}
                  onRemoveProduct={removeProduct}
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

export default Transaction;
