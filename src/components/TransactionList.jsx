import React from "react";
import SelectProduct from "./SelectProduct";
import { formatPrice } from "../helpers";

const TransactionList = ({
  productToBuy,
  onAddProduct,
  onRemoveProduct,
  onUpdate,
  onUpdateQuantity,
  totalPrice,
  onSubmitHandler,
}) => {
  const addNewProductHandler = (event) => {
    event.preventDefault();
    onAddProduct();
  };

  const removeProductHandler = (index, event) => {
    event.preventDefault();
    onRemoveProduct(index);
  };

  const quantityChangeHandler = (index, event) => {
    const current = event.target.value;
    if (current != "") onUpdateQuantity(index, parseInt(current));
  };

  return (
    <>
      <div className="col-7 mx-auto">
        <div className="card">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              {productToBuy.map((product, index) => (
                <React.Fragment key={product.key}>
                  <div className="clearfix">
                    <span className="inline h4">Produk</span>
                    {index > 0 && (
                      <div className="btn-group inline pull-left float-end me-3">
                        <button
                          className="btn btn-danger float-end"
                          onClick={(event) => {
                            removeProductHandler(index, event);
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nama Produk</label>
                    <SelectProduct index={index} onUpdateProduct={onUpdate} />
                  </div>
                  <div className="mb-5">
                    <label className="form-label">Jumlah</label>
                    <div className="input-group input-group-merge">
                      <input
                        type="number"
                        className="form-control"
                        id="html5-number-input"
                        min="1"
                        max={product.maxStock > 0 ? product.maxStock : 1}
                        value={product.quantity}
                        onChange={(event) => {
                          quantityChangeHandler(index, event);
                        }}
                        required
                      />
                      <span
                        className="input-group-text"
                        id="basic-default-email2"
                      >
                        {product.maxStock != 0 &&
                          `Maksimal: ${product.maxStock}`}
                      </span>
                    </div>

                    <h5 className="mt-2">
                      Harga:
                      {" " +
                        formatPrice(
                          (product.quantity * product.price).toString()
                        )}
                    </h5>
                  </div>
                </React.Fragment>
              ))}
              <h4 className="float-start">Total Harga:</h4>
              <br /> <br />
              <h3>
                <span className="badge bg-info">
                  {formatPrice(totalPrice.toString())}
                </span>
              </h3>
              <button type="submit" className="btn btn-primary float-end">
                Submit
              </button>
              <button
                type="submit"
                className="btn btn-success float-end me-3"
                onClick={addNewProductHandler}
              >
                Tambah Produk
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionList;
