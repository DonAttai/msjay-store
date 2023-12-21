import { useQuery } from "@tanstack/react-query";
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
