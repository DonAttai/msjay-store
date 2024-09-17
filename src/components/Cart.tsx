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
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "./empty-cart";

//import modal

export const Cart = () => {
  const { data: cart } = useCart();
  const cartQuantity = useCartQuantity();

  const navigate = useNavigate();

  const totalPrice = useCalculateTotalPrice();

  return (
    <>
      <section className=" bg-gray-100 pt-4 min-h-[calc(100vh-128px)] md:p-4">
        <div className="mx-2 md:mx-0">
          {cart?.products?.length ? (
            <section className="flex flex-col justify-between container items-center mx-auto gap-5 md:flex-row md:items-start ">
              <div className="bg-white shadow-md rounded-md  md:w-3/4">
                <div className="flex flex-col justify-between gap-3 pl-5 mt-4">
                  <h3 className="text-xl font-semibold">
                    Cart ({cartQuantity})
                  </h3>
                </div>
                <div>
                  {cart.products.map((cartItem) => (
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
                  <button
                    onClick={() => navigate("/checkout")}
                    className="p-2 bg-green-500 rounded-md shadow text-white font-bold duration-300 hover:bg-green-700"
                  >
                    Checkout
                  </button>
                  <Link
                    to="/"
                    className="p-2 bg-green-500 rounded-md shadow text-white font-bold duration-300 hover:bg-green-700"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <EmptyCart />
          )}
        </div>
      </section>
    </>
  );
};
