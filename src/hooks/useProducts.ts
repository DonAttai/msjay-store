import { IProduct } from "../types";
import axiosInstance from "./axios";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<IProduct> => {
      const res = await axiosInstance().get("/products");
      return res.data;
    },
    networkMode: "offlineFirst",
  });
};
