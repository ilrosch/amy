import axios from "axios";
import { store } from "@/lib/store";
import { selectUserToken } from "@/lib/store/slices/auth";

const axiosInstance = axios.create({
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = selectUserToken(store.getState());
    if (token) config.headers.set("Authorization", `Bearer ${token}`);
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
