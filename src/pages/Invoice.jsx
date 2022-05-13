import React, { useState, useRef } from "react";

const Invoice = () => {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div class="col-12 mx-auto">
                <div class="card mb-3">
                  <div class="card-body">
                    <h3 class="card-title">Renew Store</h3>
                    <p class="card-text">Alamat</p>
                    
                    <h1 class="card-title text-center">Invoice Pembelian</h1>
                    <p class="card-title text-center">Tanggal</p>
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
                            <tr>
                              <td>
                                <strong>1</strong>
                              </td>
                              <td>Kabelasassssssssssssssss</td>
                              <td>3</td>
                              <td>Rp15.000</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>1</strong>
                              </td>
                              <td>Kabel</td>
                              <td>3</td>
                              <td>Rp15.000</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td>
                                <strong>Subtotal</strong>
                              </td>
                              <td>
                                <strong>Rp90.000</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button
                      class="btn btn-info float-end mt-3"
                    >
                      Print
                    </button>
                  </div>
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
