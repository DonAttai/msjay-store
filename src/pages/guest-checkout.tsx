import { CartSummary } from "@/components/cart-details";
import { GuestShippingAddress } from "@/components/guest/guest-shipping-address";
import { GuestShippingAddressForm } from "@/components/guest/guest-shipping-address-form";
import { useCart } from "@/hooks/useCart";
import { useGuestActions, useGuestAddress } from "@/stores/guest-user-store";
import { useUser } from "@/stores/user-store";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export function GuestCheckout() {
  const guestAddress = useGuestAddress();
  const { setGuestAddress } = useGuestActions();
  const user = useUser();
  const { data: cart, isLoading: isLoadingCart } = useCart();

  useEffect(() => {
    setGuestAddress(
      JSON.parse(localStorage.getItem("guest-address") as string)
    );
  }, [setGuestAddress]);

  const isAddress = guestAddress === null ? false : true;

  if (user) {
    return <Navigate to="/" />;
  }

  if (cart?.products?.length! < 1) {
    return <Navigate to="/" />;
  }

  return (
    <section className="min-h-[calc(100vh-128px)] bg-slate-100  flex flex-col">
      <div className="my-4 flex flex-col gap-4 mx-4 sm:flex-row sm:justify-center ">
        <div>
          {isLoadingCart ? (
            <div className="text-2xl font-bold">Fetching cart item(s)...</div>
          ) : (
            <CartSummary isAddress={isAddress} />
          )}
        </div>
        <div>
          {guestAddress ? (
            <GuestShippingAddress />
          ) : (
            <GuestShippingAddressForm />
          )}
        </div>
      </div>
    </section>
  );
}
