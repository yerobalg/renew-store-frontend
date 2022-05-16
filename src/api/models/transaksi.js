import { coreApi } from "../index";

const addTransaksi = (data) => {
  return coreApi.post("/transaction", data);
};

const getTransaksiById = (id) => {
  return coreApi.get(`/transaction/${id}`);
};

const getTransaksi = (day = "", month = "", year = "", page = "1") => {
  let url = `/transaction/?page=${page}`;
  if (day != "" && month != "" && year != "")
    url += `&year=${year}&month=${month}&day=${day}`;
  else if (month != "" && year != "") url += `&year=${year}&month=${month}`;

  return coreApi.get(url);
};

export { addTransaksi, getTransaksiById, getTransaksi };
