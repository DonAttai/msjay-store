import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { Cart } from "../types";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts } from "./useProducts";
import { ProductType } from "../types";

// get cart item hook
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async (): Promise<Cart> => {
      const res = await axiosInstance.get("/carts/cart");
      return res.data;
    },
  });
};

// remove item from cart hook
export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: { productId: string }) => {
      const res = await axiosInstance.post("/carts/cart", productId);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data.message);
    },
  });
};

// add item to cart hook
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { productId: string }) => {
      const res = await axiosInstance.post("/carts", payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data.message);
    },
  });
};

export const useCartItemQuantity = (productId: string) => {
  const { data: cart } = useCart();
  const cartItem = cart?.products.find((item) => item.productId === productId);
  return cartItem?.quantity;
};

export const useCartQuantity = () => {
  const { data: cart } = useCart();
  return cart?.products.reduce(
    (quantity, cartItem) => cartItem.quantity + quantity,
    0
  );
};

// decrease cart item quantity hook
export const useDecreaseCartItemQuantity = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(`/carts/cart/${productId}`);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data.message);
    },
  });
};

// calculate cart item total price
export const useCalculateTotalPrice = () => {
  const { data: cart } = useCart();
  const { data } = useProducts();

  return cart?.products.reduce((total, cartItem) => {
    const product = data?.products.find(
      (item: ProductType) => item._id === cartItem.productId
    );
    return total + (Number(product?.price) || 0) * cartItem.quantity;
  }, 0);
};

// detele cart item hook
export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cartId: string) => {
      const res = await axiosInstance.delete(`/carts/${cartId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
