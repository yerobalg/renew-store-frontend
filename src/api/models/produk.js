import { coreApi } from "../index";

const getProduk = (page, keyword) => {
  let url = `/product/?page=${page}`;

  if (keyword != "") url += `&keyword=${keyword}`;

  return coreApi.get(url);
};

const addProduct = (data) => {
  return coreApi.post("/product", data);
};

const updateProduk = (slug, data) => {
  return coreApi.put(`/product/${slug}`, data);
};

const getProdukBySlug = (slug) => {
  return coreApi.get(`/product/${slug}`);
}

const deleteProduk = (slug) => {
  console.log(slug);
  return coreApi.delete(`/product/${slug}`);
};

export { getProduk, deleteProduk, addProduct, updateProduk, getProdukBySlug };
