import { useCalculateTotalPrice } from "../stores/cart-store";
import { PaystackButton } from "react-paystack";
import { useUser } from "../stores/user-store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const Paystack = () => {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!user) navigate("/auth/login");
  });

  // multiply by 1000 to convert from dollar to naira
  const totalPrice = 1000 * useCalculateTotalPrice();

  // multiply totalPrice by 100 to convert  to kobo
  const amount = totalPrice * 100;

  const componentProps = {
    email: "donattai1032@gmail.com",
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div className="min-h-[calc(100vh-128px)] pt-10">
      <div className="text-center">
        <PaystackButton
          {...componentProps}
          className="bg-green-600 text-white py-2 px-8 text-2xl rounded-md font-semibold"
        />
      </div>
    </div>
  );
};
