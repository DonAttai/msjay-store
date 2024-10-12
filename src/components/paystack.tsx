import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { useUser } from "../stores/user-store";
import { useCalculateTotalPrice, useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { EXCHANGE_RATE } from "@/lib/utils";
import { AddressType, Cart } from "@/types";
import { useCustomerAddress } from "@/hooks/useAddress";
import { useGuestAddress } from "@/stores/guest-user-store";

type CustomerType = {
  email: string;
  fullName: string;
};
type OrderType = {
  customer: CustomerType;
  addressInfo: AddressType;
  amount: number;
  cartItems: Cart["products"];
};

export const PayWithPaystack = () => {
  const totalPrice = useCalculateTotalPrice();
  const amount = EXCHANGE_RATE * totalPrice!;
  const { data: cart } = useCart();
  const user = useUser();
  const { data: address } = useCustomerAddress(user?._id as string);
  const queryClient = useQueryClient();
  const guestAddress = useGuestAddress();

  let guestAdressWithoutNameAndEmail: AddressType;
  // set customer address
  const customerAddress = {
    address: address?.address,
    street: address?.street,
    city: address?.city,
    state: address?.state,
    phone: address?.phone,
  } as AddressType;

  if (guestAddress) {
    const { email, fullName, ...others } = guestAddress;
    // set guest address
    guestAdressWithoutNameAndEmail = others;
  }

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

  let customer: CustomerType = { email: "", fullName: "" };
  if (user) {
    customer.email = user.email;
    customer.fullName = `${user.firstName}  ${user.lastName}`;
  } else {
    customer.email = guestAddress?.email as string;
    customer.fullName = guestAddress?.fullName as string;
  }

  const makePayment = () => {
    payWithPaystack({
      amount,
      customer,
      addressInfo: user ? customerAddress : guestAdressWithoutNameAndEmail,
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
      {isLoading ? "Wait..." : "Proceed To Payment"}
    </Button>
  );
};
