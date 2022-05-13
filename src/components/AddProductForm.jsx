import React, { useRef, useState } from "react";
import { formatPrice } from "../helpers";
import Spinner from "../components/Spinner";
import InvalidValidation from "../components/InvalidValidation";

const AddProductForm = ({ onAddProduk, errMsgName, isLoading, produk }) => {
  const [nama, stok, harga] = [useRef(), useRef(), useRef()];
  const [formattedPrice, setFormattedPrice] = useState("");

  const priceHandler = (event) => {
    const price = event.target.value;
    setFormattedPrice(price != "" ? formatPrice(price) : "");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAddProduk(nama.current.value, harga.current.value, stok.current.value);
  };
  return (
    <>
      <div className="col-7 mx-auto">
        <div className="card">
          <div className="card-body">
            {isLoading && <Spinner />}
            <form onSubmit={submitHandler}>
              <div className={`mb-${errMsgName != "" ? 0 : 3}`}>
                <label className="form-label">Nama Produk</label>
                <input
                  type="text"
                  className={`form-control ${errMsgName != "" && "invalid"}`}
                  id="basic-default-fullname"
                  placeholder="Kabel"
                  ref={nama}
                  required
                  defaultValue={produk && produk.name}
                />
                {errMsgName != "" && <InvalidValidation msg={errMsgName} />}
              </div>
              <div className={`mb-3`}>
                <label className="form-label">Stok</label>
                <input
                  type="number"
                  className="form-control"
                  id="html5-number-input"
                  placeholder="10"
                  ref={stok}
                  required
                  defaultValue={produk && produk.stock}
                />
              </div>
              <div className={`mb-3`}>
                <label className="form-label">Harga</label>
                <div className="input-group input-group-merge">
                  <input
                    type="number"
                    id="html5-number-input"
                    className="form-control"
                    onChange={priceHandler}
                    placeholder="10000"
                    ref={harga}
                    required
                    defaultValue={produk && produk.sell_price}
                  />
                  <span className="input-group-text" id="basic-default-email2">
                    {formattedPrice != ""
                      ? formattedPrice
                      : produk
                      ? formatPrice(`${produk.sell_price}`)
                      : ""}
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-end">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
