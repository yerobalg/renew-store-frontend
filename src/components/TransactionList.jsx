import React from "react";

const TransactionList = ({ productToBuy, onAddProduct, onRemoveProduct }) => {
  const addNewProductHandler = (event) => {
    event.preventDefault();
    onAddProduct();
    console.log(productToBuy.length);
  };
  const removeProductHandler = (product, event) => {
    event.preventDefault();
    onRemoveProduct(productToBuy.filter((p) => p.key !== product.key));
  };
  return (
    <>
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-body">
            <form>
              {productToBuy.map((product, index) => (
                <>
                  <div class="clearfix">
                    <span class="inline h4">Produk {index + 1}</span>
                    {index > 0 && (
                      <div class="btn-group inline pull-left float-end me-3">
                        <button
                          class="btn btn-danger float-end"
                          onClick={(event) => {
                            removeProductHandler(product, event);
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label class="form-label">ID/Nama Produk</label>
                    <input
                      class="form-control"
                      list="datalistOptions"
                      id="exampleDataList"
                    />
                    <datalist id="datalistOptions">
                      <option value="San Francisco"></option>
                      <option value="New York"></option>
                      <option value="Seattle"></option>
                      <option value="Los Angeles"></option>
                      <option value="Chicago"></option>
                    </datalist>
                  </div>
                  <div class="mb-5">
                    <label class="form-label">Jumlah</label>
                    <input
                      type="number"
                      class="form-control"
                      id="html5-number-input"
                      value={product.stock}
                    />
                    <h5 class="mt-2">Harga : </h5>
                  </div>
                </>
              ))}
              <h4 class="float-start">Total Harga: </h4>
              <button type="submit" class="btn btn-primary float-end">
                Submit
              </button>
              <button
                class="btn btn-success float-end me-3"
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
