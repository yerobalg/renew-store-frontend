import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getProduk } from "../api/models/produk";

const SelectProduct = ({ index, onUpdateProduct }) => {
  const [produkList, setProdukList] = useState([]);
  const [input, setInput] = useState([]);

  const selectProductHandler = (e) => {
    onUpdateProduct(index, e.value, e.maxStock, e.price);
  };

  const inputChangeHandler = (query, { action }) => {
    if (action != "input-change") return;
    setInput(query);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (input == "") return;
      const response = await getProduk(1, input, true);
      const produk = response.data.data.products;
      setProdukList([
        ...produk.map(({ name, slug, stock, sell_price }) => ({
          value: slug,
          label: name,
          maxStock: stock,
          price: sell_price,
        })),
      ]);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Select
      options={produkList}
      onChange={selectProductHandler}
      onInputChange={inputChangeHandler}
      isLoading={produkList.length == 0}
    />
  );
};

export default SelectProduct;
