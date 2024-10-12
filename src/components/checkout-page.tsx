import { useCart } from "@/hooks/useCart";
import { useUser } from "@/stores/user-store";
import { Navigate } from "react-router-dom";
import { useCustomerAddress } from "@/hooks/useAddress";

import { ShippingAddress } from "./shipping-address";
import { AddShippingAddressForm } from "./add-shipping-address-form";
import { CartSummary } from "./cart-details";
import { UserType } from "@/types";

export const CheckoutPage = () => {
  const { data: cart, isLoading: isLoadingCart } = useCart();
  const user = useUser() as UserType;

  const {
    data: address,
    isSuccess,
    isLoading: isFetchingAddress,
  } = useCustomerAddress(user?._id);

  if (isLoadingCart) {
    return (
      <section className=" pt-4 min-h-[calc(100vh-128px)] bg-slate-100 grid place-content-center">
        <p className="text-3xl">Loading...</p>
      </section>
    );
  }

  // cart is empty navigate to store
  if (cart && cart?.products.length < 1) {
    return <Navigate to="/" />;
  }

  // user is not authenticated ui
  if (!user && cart?.products.length) {
    return <Navigate to="/guest-checkout" />;
  }

  return (
    <section className="min-h-[calc(100vh-128px)] bg-slate-100 flex flex-col">
      <div className="my-4 flex justify-center gap-4 mx-4">
        <div>
          {address ? (
            <ShippingAddress />
          ) : isFetchingAddress ? (
            <div className="text-3xl">Fetching address...</div>
          ) : (
            <AddShippingAddressForm />
          )}
        </div>
        {isLoadingCart ? (
          <div className="text-2xl font-bold">Fetching cart item(s)...</div>
        ) : (
          <CartSummary isAddress={isSuccess} />
        )}
      </div>
    </section>
  );
};
