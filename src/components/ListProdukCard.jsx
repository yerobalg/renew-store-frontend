import React from "react";
import { formatPrice } from "../helpers";

const ListProdukCard = ({ produk, onDelete, onUpdate }) => {
  return (
    <div className="card mb-4" id="list-produk">
      <div className="card-body">
        <h3 className="card-title">{produk.name}</h3>
        <div className="table-responsive text-nowrap">
          <table className="table table-striped">
            <tbody className="table-border-bottom-0">
              <tr>
                <td>
                  <i className="fab fa-angular fa-lg text-danger me-3"></i>
                  <strong>Stok</strong>
                </td>
                <td>{produk.stock}</td>
              </tr>
              <tr>
                <td>
                  <i className="fab fa-angular fa-lg text-danger me-3"></i>
                  <strong>Harga Jual</strong>
                </td>
                <td>{formatPrice(produk.sell_price.toString())}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="btn rounded-pill btn-outline-info mr-3"
          onClick={() => onUpdate(produk.slug)}
        >
          Ubah
        </button>
        <button
          type="button"
          className="btn rounded-pill btn-outline-danger mr-3"
          onClick={() => onDelete(produk.slug)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default ListProdukCard;
