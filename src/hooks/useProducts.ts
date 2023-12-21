import { IProduct } from "../types";
import axiosInstance from "./axios";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance()
        .get<IProduct>(`/products`)
        .then((res) => res.data),
  });
};
