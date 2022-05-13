import React from "react";

const TransactionTable = () => {
  return (
    <>
      <div class="card">
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Waktu Transaksi</th>
                <th>Total Harga</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr>
                <td>
                  <strong>1</strong>
                </td>
                <td>12:30:00, 12/12/2019</td>
                <td>Rp12.500</td>
                <td>
                  <button type="button" className="btn btn-sm btn-info">
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>2</strong>
                </td>
                <td>12:30:00, 12/12/2019</td>
                <td>Rp15.000</td>
                <td>
                  <button type="button" className="btn btn-sm btn-info">
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
