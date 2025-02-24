import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthType } from "@/types/types";

export const BASE_URL = "http://localhost:8080/api/v1/";

export const queryClient = new QueryClient();

export const authAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isInterceptorSet = false;

export const setupAuthAxiosInterceptors = (
  navigate: NavigateFunction,
  setAuth: (auth: AuthType) => void
) => {
  if (!isInterceptorSet) {
    authAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("auth");
          setAuth({ isLoggedIn: false, email: null });
          navigate("/login", { replace: true });

          toast.info("Byl jste odhlášen, prosím přihlašte se znovu");
        }

        return Promise.reject(error);
      }
    );

    isInterceptorSet = true;
  }
};
