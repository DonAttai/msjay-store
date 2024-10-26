// import cart-store hooks
import {
  useCalculateTotalPrice,
  useCart,
  useCartQuantity,
} from "../hooks/useCart";

//import currencYFormatter
import { currencyFormatter } from "../lib/currency-formatter";

// import user-store  hooks

//import components
import { Item } from ".";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useUser } from "@/stores/user-store";

//import modal

export const Cart = () => {
  const { data: cart, isLoading } = useCart();
  const user = useUser();
  const cartQuantity = useCartQuantity();

  const totalPrice = useCalculateTotalPrice();

  if ((cartQuantity as number) <= 0) {
    return <Navigate to="/store" />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen text-3xl grid place-content-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <section className=" bg-gray-100 pt-4 min-h-[calc(100vh-128px)] md:p-4">
        <div className="mx-2 md:mx-0">
          {cartQuantity && (
            <section className="flex flex-col justify-between container items-center mx-auto gap-5 md:flex-row md:items-start ">
              <div className="bg-white shadow-md rounded-md  md:w-3/4">
                <div className="flex flex-col justify-between gap-3 pl-5 mt-4">
                  <h3 className="text-xl font-semibold">
                    Cart ({cartQuantity})
                  </h3>
                </div>
                <div>
                  {cart?.products.map((cartItem) => (
                    <Item key={cartItem.productId} {...cartItem} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col w-full bg-white shadow-md py-2 rounded-md h-fit md:w-1/4">
                <div className="mb-2">
                  <h3 className="font-semibold p-2">CART SUMMARY</h3>
                  <hr className="w-full" />
                </div>
                <div className="mb-2">
                  <div className="flex flex-col flex-wrap justify-between p-2 font-medium text-lg md:flex-row">
                    <p>Subtotal</p>
                    <p className="text-2xl ">
                      {currencyFormatter(totalPrice as number)}
                    </p>
                  </div>
                  <hr className="w-full" />
                </div>
                <div className="text-center mb-2 gap-2 flex flex-col px-4">
                  {user ? (
                    <CheckoutButton title="Checkout" url="checkout" />
                  ) : (
                    <CheckoutButton
                      title="Guest Checkout"
                      url="guest-checkout"
                    />
                  )}
                  <Link
                    to="/store"
                    className="p-2 bg-green-500 rounded-md shadow text-white text-lg font-bold duration-300 hover:bg-green-700"
                  >
                    Back To Store
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
};

function CheckoutButton({ title, url }: { title: string; url: string }) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(`/${url}`)}
      className="p-2 bg-green-500 rounded-md shadow text-white text-lg font-bold duration-300 hover:bg-green-700"
    >
      {title}
    </Button>
  );
}
