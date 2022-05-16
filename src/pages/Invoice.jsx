import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { getTransaksiById } from "../api/models/transaksi";
import Spinner from "../components/Spinner";
import InvoicePrint from "../components/InvoicePrint";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {

  useEffect(() => {
    document.title = "Renew Store | Invoice";
  }, []);
  
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [produk, setProduk] = useState([]);
  const [dataTransaksi, setDataTransaksi] = useState({});
  const [total, setTotal] = useState(0);

  const curRef = useRef();

  const getTransaksi = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getTransaksiById(id);
      setProduk(res.data.data.ProductTransactions);
      setTotal(res.data.data.total_price);
      setDataTransaksi({ 
        tanggal: res.data.data.createdAt,
        id: res.data.data.id
      });
    } catch (error) {
      alert(error.response.data.message)
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTransaksi();
  }, [getTransaksi]);

  const printHandler = useReactToPrint({
    content: () => curRef.current,
    copyStyles: true,
  });

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div class="col-12 mx-auto">
                <div class="card mb-3">
                  {!isLoading ? (
                    <div class="card-body">
                      <InvoicePrint
                        ref={curRef}
                        produk={produk}
                        total={total}
                        data={dataTransaksi}
                      />
                      <button
                        class="btn btn-info float-end mt-3"
                        onClick={printHandler}
                      >
                        Print
                      </button>
                    </div>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
