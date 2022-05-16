import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../helpers";

const TransactionTable = ({ transactions }) => {
  const navigate = useNavigate();
  const detailHandler = (id, event) => {
    event.preventDefault();
    navigate(`/invoice/${id}`);
  };
  return (
    <>
      <div className="card mb-3">
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Waktu Transaksi</th>
                <th>Total Harga</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {transactions.map(({ id, createdAt, total_price }, index) => (
                <tr key={index}>
                  <td>
                    <strong>{id}</strong>
                  </td>
                  <td>{createdAt}</td>
                  <td>{formatPrice(total_price.toString())}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-info"
                      onClick={(event) => detailHandler(id, event)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
