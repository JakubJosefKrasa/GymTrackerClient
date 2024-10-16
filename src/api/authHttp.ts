import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "@/api/http";
import { LoginType, RegisterType } from "@/types/schemas";

const AUTH_URL = BASE_URL + "auth/";

async function register(registerData: RegisterType) {
  return await axios.post<void>(
    AUTH_URL + "register",
    { ...registerData },
    { withCredentials: true }
  );
}

async function login(loginData: LoginType) {
  return await axios.post<void>(
    AUTH_URL + "login",
    { ...loginData },
    { withCredentials: true }
  );
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: register,
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
  });
}
