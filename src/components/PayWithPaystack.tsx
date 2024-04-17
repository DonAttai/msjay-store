import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../hooks/axios";
import { useCalculateTotalPrice } from "../stores/cart-store";
import { useUser } from "../stores/user-store";

export const PayWithPaystack = () => {
  const amount = 1000 * useCalculateTotalPrice();
  const user = useUser();
  const { isLoading, mutate } = useMutation({
    mutationFn: async (userData: { amount: number; email: string }) => {
      const res = await axiosInstance().post("/payment", userData);
      return res.data;
    },

    onSuccess: (payload) => {
      const url = payload.data?.authorization_url;
      window.location.href = url;
    },
    onError: (error) => console.log(error),
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
