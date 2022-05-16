import React, { createContext, useContext, useEffect, useState } from "react";
import { coreApi } from "../api";
import { getKaryawan } from "../api/models/karyawan";

export const defaultValue = {
  isAuthenticated: !!localStorage.getItem("rs_token"),
  karyawanInfo: null,
  loggedIn: () => {},
  logout: () => {},
  fetchKaryawan: () => {},
};

const KaryawanContext = createContext(defaultValue);

export const KaryawanWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultValue.isAuthenticated
  );
  const [karyawanInfo, setKaryawanInfo] = useState(defaultValue.karyawanInfo);

  const loggedIn = (token) => {
    coreApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    localStorage.setItem("rs_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setKaryawanInfo({});
    localStorage.removeItem("rs_token");
    coreApi.defaults.headers.common["Authorization"] = "";
  };

  const fetchKaryawan = async () => {
    try {
      const res = await getKaryawan();

      if (res.data.data) {
        setKaryawanInfo(res.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        logout();
        return;
      }
      alert(error.response?.data.message || error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchKaryawan();
    }
  }, [isAuthenticated]);

  return (
    <KaryawanContext.Provider
      value={{
        isAuthenticated,
        loggedIn,
        logout,
        karyawanInfo,
        fetchKaryawan,
      }}
    >
      {children}
    </KaryawanContext.Provider>
  );
};

export const useKaryawanContext = () => useContext(KaryawanContext);
