// import cart-store hooks
import {
  useCart,
  useCartActions,
  useCalculateTotalPrice,
} from "../stores/cart-store";

//import currencYFormatter
import { currencyFormatter } from "../utils/currency-formatter";

// import user-store  hooks
import { useUser } from "../stores/user-store";

//import components
import { Item } from ".";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { UserType } from "../types";
import toast from "react-hot-toast";

//import modal

export const Cart = () => {
  const { getCartQuantity } = useCartActions();

  const user = useUser() as UserType;
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useCart();

  const totalPrice = useCalculateTotalPrice();

  const handlePaymentClick = () => {
    if (user && user.isVerified) {
      navigate("/checkout");
    } else if (user && !user.isVerified) {
      toast("Verify your account to checkout");
    } else {
      navigate("/auth/login", {
        state: { from: location },
        replace: true,
      });
      toast.custom(
        <div className=" flex justify-center items-center bg-white px-2 py-4 rounded-md shadow-md md:w-1/3 sm:w-2/3">
          <span className="text-green-500 text-xl">
            👍 You have to login to checkout
          </span>
        </div>
      );
    }
  };

  return (
    <>
      <section className=" bg-gray-100 pt-4 min-h-screen md:p-4">
        <div className="mx-2 md:mx-0">
          {cart.length ? (
            <section className="flex flex-col justify-between container items-center mx-auto gap-5 md:flex-row md:items-start ">
              <div className="bg-white shadow-md rounded-md  md:w-3/4">
                <div className="flex flex-col justify-between gap-3 pl-5 mt-4">
                  <h3 className="text-xl font-semibold">
                    Cart ({getCartQuantity()})
                  </h3>
                </div>
                <div>
                  {cart.map((cartItem) => (
                    <Item key={cartItem.id} {...cartItem} />
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
                    <p className="text-2xl ">{currencyFormatter(totalPrice)}</p>
                  </div>
                  <hr className="w-full" />
                </div>
                <div className="text-center mb-2 gap-2 flex flex-col px-4">
                  <button
                    onClick={handlePaymentClick}
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
            <div className="flex flex-col justify-center rounded-md h-96 gap-4 items-center max-w-sm bg-white mx-auto ">
              <div className="text-2xl text-green-500">
                <FaShoppingCart size={"1.8em"} />
              </div>
              <p className="text-xl max-w-sm">Your cart is empty</p>
              <Link
                to="/"
                className="bg-green-500 font-semibold shadow-md rounded-md text-white p-2 hover:bg-green-700"
              >
                START SHOPPING
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
