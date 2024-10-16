import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const BASE_URL = "http://localhost:8080/api/v1/";

export const queryClient = new QueryClient();

export const authAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.log("auth axios error: ", error);
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
