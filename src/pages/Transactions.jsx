import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import TransactionTable from "../components/TransactionTable";
import { getTransaksi } from "../api/models/transaksi";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

const Transactions = () => {
  useEffect(() => {
    document.title = "Renew Store | Daftar Transaksi";
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const [disabledDate, setDisabledDate] = useState(false);
  const [disabledMonth, setDisabledMonth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState({});

  const page = searchParams.get("page") || "1";
  const year = searchParams.get("year") || "";
  const month = searchParams.get("month") || "";
  const day = searchParams.get("day") || "";

  const inputDate = useRef();
  const inputMonth = useRef();

  const handlerDate = (event) => {
    const value = event.target.value;
    if (value != "") setDisabledMonth(true);
    else setDisabledMonth(false);
  };

  const handlerMonth = (event) => {
    const value = event.target.value;
    if (value != "") setDisabledDate(true);
    else setDisabledDate(false);
  };

  const getTransaksiFromApi = useCallback(async (day, month, year, page) => {
    setIsLoading(true);
    const response = await getTransaksi(day, month, year, page);
    const data = response.data.data;
    setTransactions(data.transactions);
    setData({ ...data, transactions: undefined });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTransaksiFromApi(day, month, year, page);
  }, [getTransaksiFromApi]);

  const movePage = (page) => {
    setSearchParams({ page });
    getTransaksiFromApi(year, month, day, page);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const selectedDate = inputDate.current.value;
    const selectedMonth = inputMonth.current.value;

    if (selectedDate == "" && selectedMonth == "") {
      alert("Tanggal atau Bulan tidak boleh kosong");
      return;
    } else if (selectedDate == "") {
      const split = selectedMonth.split("-");
      setSearchParams({ month: split[1], year: split[0] });
      getTransaksiFromApi("", split[1], split[0], page);
    } else if (selectedMonth == "") {
      const split = selectedDate.split("-");
      setSearchParams({ day: split[2], month: split[1], year: split[0] });
      getTransaksiFromApi(split[2], split[1], split[0], page);
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
                  <span className="text-muted fw-light">Transaksi /</span>
                  Daftar Transaksi
                </h4>
                <div className="col-5 mx-auto">
                  <div className="card mb-4">
                    <div className="card-body">
                      <form onSubmit={submitHandler}>
                        <div className="mb-3 row">
                          <label
                            htmlFor="html5-month-input"
                            className="col-md-2 col-form-label"
                          >
                            Bulan
                          </label>
                          <div className="col-md-10">
                            <input
                              className="form-control"
                              type="month"
                              id="html5-month-input"
                              onChange={handlerMonth}
                              disabled={disabledMonth}
                              ref={inputMonth}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label
                            htmlFor="html5-date-input"
                            className="col-md-2 col-form-label"
                          >
                            Tanggal
                          </label>
                          <div className="col-md-10">
                            <input
                              className="form-control"
                              type="date"
                              id="html5-date-input"
                              onChange={handlerDate}
                              disabled={disabledDate}
                              ref={inputDate}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary float-end"
                        >
                          Cari Transaksi
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {!isLoading ? (
                  <TransactionTable transactions={transactions} />
                ) : (
                  <Spinner />
                )}
                <Pagination
                  currentPage={parseInt(page)}
                  totalPages={data.totalPages}
                  itemsPerPage={10}
                  onChangePage={movePage}
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

export default Transactions;
