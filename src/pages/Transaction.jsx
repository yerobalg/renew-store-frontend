import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { addTransaksi } from "../api/models/transaksi";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const baseProduct = {
    key: 0,
    slug: "",
    quantity: 1,
    maxStock: 0,
    price: 0,
  };
  const [productToBuy, setProductToBuy] = useState([baseProduct]);
  const [number, setNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const appendBaseProduct = () => {
    setProductToBuy([...productToBuy, { ...baseProduct, key: number }]);
    console.log(productToBuy.length);
  };

  useEffect(() => {
    document.title = "Renew Store | Transaksi";
  }, []);

  useEffect(() => {
    setNumber(number + 1);
  }, [productToBuy]);

  useEffect(() => {
    setTotalPrice(
      productToBuy.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
    console.log("changed");
  }, [productToBuy]);

  const removeProduct = (index) => {
    productToBuy.splice(index, 1);
    setProductToBuy([...productToBuy]);
    console.log(productToBuy);
  };

  const updateProduct = (index, slug, maxStock, price) => {
    productToBuy[index].slug = slug;
    productToBuy[index].quantity = 1;
    productToBuy[index].maxStock = maxStock;
    productToBuy[index].price = price;
    setProductToBuy([...productToBuy]);
    console.log(productToBuy);
  };

  const updateProductQuantity = (index, quantity) => {
    productToBuy[index].quantity = quantity;
    setProductToBuy([...productToBuy]);
    console.log(productToBuy);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let isValid = true;

    const transactionBody = productToBuy.map(({ slug, quantity }) => {
      if (slug == "") isValid = false;
      return { slug, quantity };
    });

    if (!isValid) {
      alert("Semua produk harus diisi");
      return;
    }

    try {
      const response = await addTransaksi(transactionBody);
      const data = response.data;
      alert(data.message);
      navigate(`/invoice/${data.id_transaksi}`);
    } catch (error) {
      alert(error.response.data.message);
    }
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
                  onUpdate={updateProduct}
                  onUpdateQuantity={updateProductQuantity}
                  totalPrice={totalPrice}
                  onSubmitHandler={submitHandler}
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
