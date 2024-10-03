import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { useUser } from "../stores/user-store";
import { useCalculateTotalPrice, useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { EXCHANGE_RATE } from "@/lib/utils";
import { Cart } from "@/types";

export const PayWithPaystack = () => {
  const totalPrice = useCalculateTotalPrice();
  const amount = EXCHANGE_RATE * totalPrice!;
  const { data: cart } = useCart();
  const user = useUser();

  const queryClient = useQueryClient();

  type OrderType = {
    email: string;
    amount: number;
    cartItems: Cart["products"];
  };
  const {
    data: payload,
    isLoading,
    mutate: payWithPaystack,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (userData: OrderType) => {
      const res = await axiosInstance.post("/paystack/initialize", userData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const makePayment = () => {
    payWithPaystack({
      amount,
      email: user?.email!,
      cartItems: cart?.products!,
    });
  };
  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message || error.message;
        toast.error(errorMessage);
      }
    }

    if (isSuccess) {
      window.location.href = payload.paymentUrl;
    }
  });
  return (
    <Button
      className=" mx-2 p-4 bg-green-400 text-white text-lg font-bold hover:bg-green-600 "
      type="submit"
      disabled={isLoading}
      onClick={makePayment}
    >
      {isLoading ? "Wait..." : "PAY NOW"}
    </Button>
  );
};
