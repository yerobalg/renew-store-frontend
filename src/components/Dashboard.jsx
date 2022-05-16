import React from "react";
import { useLocation, NavLink } from "react-router-dom";

const Dashboard = () => {
  const pathName = useLocation().pathname;
  const menuActive = {
    produk: pathName == "/produk",
    "tambah-produk": pathName == "/tambah-produk",
    transaksi: pathName == "/transaksi",
    "tambah-transaksi": pathName == "/tambah-transaksi",
  };
  const closeDashboard = () => {
    const html = document.getElementById("html");
    html.classList.remove("layout-menu-expanded");
  };
  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <NavLink to="/produk" className="app-brand-link">
            <i className="bx bxs-bolt-circle bx-lg"></i>
            <span className="app-brand-text demo menu-text fw-bolder ms-2">
              renew store
            </span>
          </NavLink>
          <a className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i
              onClick={closeDashboard}
              className="bx bx-chevron-left bx-sm align-middle"
            ></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Produk</span>
          </li>
          <li className={`menu-item ${menuActive.produk ? "active" : ""}`}>
            <NavLink to="/produk" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-zap"></i>
              <div>Daftar Produk</div>
            </NavLink>
          </li>
          <li
            className={`menu-item ${
              menuActive["tambah-produk"] ? "active" : ""
            }`}
          >
            <NavLink to="/tambah-produk" className="menu-link">
              <i className="menu-icon tf-icons bx bx-layer-plus"></i>
              <div>Tambah Produk</div>
            </NavLink>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Transaksi</span>
          </li>
          <li
            className={`menu-item ${
              menuActive["tambah-transaksi"] ? "active" : ""
            }`}
          >
            <NavLink to="/tambah-transaksi" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-file-plus"></i>
              <div data-i18n="Basic">Tambah Transaksi</div>
            </NavLink>
          </li>
          <li className={`menu-item ${menuActive.transaksi ? "active" : ""}`}>
            <NavLink to="/transaksi" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-book-content"></i>
              <div data-i18n="User interface">Daftar Transaksi</div>
            </NavLink>
          </li>
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Karyawan</span>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon tf-icons bx bx-timer"></i>
              <div data-i18n="Support">Coming Soon!</div>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Dashboard;
