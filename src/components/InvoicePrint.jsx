import React from "react";
import { formatPrice } from "../helpers";

const InvoicePrint = React.forwardRef((props, ref) => {
  return (
    <div class="card-body" ref={ref}>
      <h3 class="card-title">Renew Store</h3>
      <p class="card-text text-right">
        Jalan Raden Patah No. 3, Sudimara Barat, Ciledug, Kota Tangerang
      </p>

      <h1 class="card-title text-center">Invoice Pembelian</h1>
      <p class="card-title text-center">ID: {props.data.id}, {props.data.tanggal}</p>
      <div class="card">
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              {props.produk.map((item, index) => (
                <tr key={index}>
                  <td>
                    <strong>{index + 1}</strong>
                  </td>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatPrice(item.price.toString())}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td>
                  <strong>Subtotal</strong>
                </td>
                <td>
                  <strong>{formatPrice(props.total.toString())}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default InvoicePrint;
