import { useCalculateTotalPrice } from "../stores/cart-store";
import { PaystackButton } from "react-paystack";

const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const Paystack = () => {
  const amount = 1005 * useCalculateTotalPrice() * 100;

  console.log(amount);

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
