import { coreApi } from "../index";

const getKaryawan = () => {
  return coreApi.get("/employee/profile");
};

const login = (data) => {
  return coreApi.post("/auth/login", data);
};

export { login, getKaryawan };
