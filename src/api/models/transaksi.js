import { coreApi } from "../index";

const addTransaksi = (data) => {
  return coreApi.post("/transaction", data);
};

export { addTransaksi };
