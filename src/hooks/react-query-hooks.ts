import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CartItem, IProduct } from "../types";
import toast from "react-hot-toast";

let API;

if (import.meta.env.NODE_ENV === "development") {
  API = import.meta.env.VITE_LOCAL_API_URL;
} else {
  API = import.meta.env.VITE_API_URL;
}

export const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export type UserType = {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  roles: string[];
  accessToken: string;
};

// product query
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get<IProduct>(`/products`).then((res) => res.data),
  });
};

// cart query
export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: (): Promise<CartItem[]> =>
      axiosInstance.get("/carts").then((res) => res.data),
  });
};

// login
export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: {
      username: string;
      password: string;
    }): Promise<UserType> =>
      axiosInstance.post("/auth/login", credentials).then((res) => res.data),
    onSuccess: () => {
      toast.success("Login successful!");
    },
  });
};

// register
export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: {
      username: string;
      password: string;
      email: string;
    }): Promise<{ message: string }> =>
      axiosInstance.post("/auth/register", credentials).then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};

// forget password
export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (userData: { email: string }): Promise<{ message: string }> =>
      axiosInstance.post("/auth/forget-password", userData).then((res) => {
        return res.data;
      }),
    onSuccess: (data: { message: string }) => toast.success(data.message),
  });
};

// reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      password,
      id,
      token,
    }: {
      password: string;
      id: string;
      token: string;
    }): Promise<{ message: string }> =>
      axiosInstance
        .post(`/auth/reset-password/${id}/${token}`, { password })
        .then((res) => res.data),
    onSuccess: (data: { message: string }) => toast.success(data.message),
  });
};

// verify emaill
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({
      id,
      token,
    }: {
      id: string;
      token: string;
    }): Promise<UserType> =>
      axiosInstance
        .post(`/auth/verify-email/${id}/${token}`, { token })
        .then((res) => res.data),
    onSuccess: () => toast.success("Acount verification successful"),
  });
};

// get a single user
export const useUserQuery = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => axiosInstance.get(`/users/${id}`).then((res) => res.data),
  });
};
