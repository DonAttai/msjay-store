import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { CartItem } from "../types";

export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: (): Promise<CartItem[]> =>
      axiosInstance()
        .get("/carts")
        .then((res) => res.data),
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: () =>
      axiosInstance()
        .post("/carts")
        .then((res) => res.data),
  });
};
