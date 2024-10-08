import { IProduct, ProductType } from "../types";
import axiosInstance from "../lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<IProduct> => {
      const res = await axiosInstance.get("/products/?size=40&order=desc");
      return res.data;
    },
  });
};

// get all products
export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products", "get-all-products"],
    queryFn: async (): Promise<ProductType[]> => {
      const res = await axiosInstance.get("/admin/products");
      return res.data;
    },
  });
};
// create product hooks
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: ProductType): Promise<{ message: string }> => {
      const res = await axiosInstance.post("/admin/products", product);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
// create product hooks
export const useUpdateProduct = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: ProductType): Promise<{ message: string }> => {
      const res = await axiosInstance.patch(
        `/admin/products/${productId}`,
        product
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
