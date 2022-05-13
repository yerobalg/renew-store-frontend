import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import ListProdukCard from "../components/ListProdukCard";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { getProduk, deleteProduk } from "../api/models/produk";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({});
  const [produk, setProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = searchParams.get("page") || "1";
  const keyword = searchParams.get("keyword") || "";

  console.log(process.env.PUBLIC_URL);

  const getProdukFromApi = useCallback(async () => {
    setIsLoading(true);
    let response;
    try {
      response = await getProduk(page, keyword);
      setProduk(response.data.data.products);
      setData({ ...response.data.data, products: undefined });
    } catch (error) {}
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getProdukFromApi();
  }, [getProdukFromApi]);

  const showProduk = () => {
    if (isLoading) return <Spinner />;
    else if (produk.length === 0 && keyword != "")
      return <h1>Produk tidak ditemukan</h1>;

    return produk.map((prod) => (
      <ListProdukCard
        key={prod.id}
        produk={prod}
        onDelete={deleteProdukFromApi}
        onUpdate={toUpdateForm}
      />
    ));
  };

  const deleteProdukFromApi = async (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus produk ini?")) {
      const res = await deleteProduk(id);
      console.log(res.data);
      window.alert("Produk berhasil dihapus");
      getProdukFromApi();
    }
  };

  const toUpdateForm = (slug) => {
    navigate(`/ubah-produk/${slug}`);
  };

  const movePage = (page, keyword = "") => {
    if (keyword == "")
      setSearchParams({ page });
    else
      setSearchParams({ page, keyword });

    getProdukFromApi();
  }

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
                  <span className="text-muted fw-light">Produk /</span> Daftar
                  Produk
                </h4>
                {showProduk()}
                {Object.keys(data).length > 0 && (
                  <Pagination
                    currentPage={parseInt(page)}
                    totalPages={data.totalPages}
                    itemsPerPage={5}
                    onChangePage={movePage}
                  />
                )}
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

export default Index;
