import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../hooks/axios";
import { useUser } from "../stores/user-store";
import { useCalculateTotalPrice } from "../hooks/useCart";
import { useEffect } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const PayWithPaystack = () => {
  const totalPrice = useCalculateTotalPrice();
  const amount = 1000 * totalPrice!;
  const user = useUser();
  const {
    data: payload,
    isLoading,
    mutate,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (userData: { amount: number; email: string }) => {
      const res = await axiosInstance().post("/paystack/initialize", userData);
      return res.data;
    },
  });

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message || error.message;
        toast.error(errorMessage);
      }
    }

    if (isSuccess) {
      const url = payload.data?.authorization_url;
      window.location.href = url;
    }
  });
  return (
    <button
      className=" mx-2 p-4 bg-green-400 text-white font-bold"
      type="submit"
      onClick={() => mutate({ amount, email: user?.email! })}
    >
      {isLoading ? "Wait..." : "PayWithPaystack"}
    </button>
  );
};
