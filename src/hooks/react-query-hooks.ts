import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product, CartItem } from "../types";

const API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get<Product[]>("/products").then((res) => res.data),
  });
};

export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: (): Promise<CartItem[]> =>
      axiosInstance.get("/carts").then((res) => res.data),
  });
};
