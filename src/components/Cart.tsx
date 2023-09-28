// import cart-store hooks
import {
  useCart,
  useCartActions,
  useCalculateTotalPrice,
} from "../stores/cart-store";

//import currencYFormatter
import { currencyFormatter } from "../utils/currency-formatter";

//import components
import { Item, StoreItem } from ".";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

// import react-query-hooks
import { useProducts } from "../hooks/react-query-hooks";
import { Product } from "../types";

export const Cart = () => {
  const { getCartQuantity, clearCart } = useCartActions();
  const { data } = useProducts();

  const filteredProducts = data?.filter(
    (product) =>
      product.category === "women's clothing" || product.category === "jewelery"
  );

  const cart = useCart();

  const totalPrice = useCalculateTotalPrice();

  return (
    <>
      <section className=" bg-gray-100 min-h-screen p-4">
        <div>
          {cart.length ? (
            <section className="flex justify-between container mx-auto gap-5 ">
              <div className="bg-white shadow-md rounded-md w-3/4">
                <div className="flex flex-col justify-between gap-3 pl-5 mt-4">
                  <h3 className="text-xl font-semibold">
                    Shopping Cart ({getCartQuantity()})
                  </h3>
                </div>
                <div>
                  {cart.map((cartItem) => (
                    <Item key={cartItem.id} {...cartItem} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col w-1/4 bg-white shadow-md rounded-md h-fit">
                <div className="mb-2">
                  <h3 className="font-semibold p-2">CART SUMMARY</h3>
                  <hr className="w-full" />
                </div>
                <div className="mb-2">
                  <div className="flex flex-wrap justify-between p-2 font-medium text-lg">
                    <p>Subtotal</p>
                    <p className="text-2xl">{currencyFormatter(totalPrice)}</p>
                  </div>
                  <hr className="w-full" />
                </div>
                <div className="text-center mb-2 gap-2 flex flex-col px-4">
                  <button
                    onClick={() => clearCart()}
                    className="p-2 bg-green-600 rounded-md shadow text-white font-bold"
                  >
                    CHECKOUT
                  </button>
                  <Link
                    to="/"
                    className="p-2 bg-green-600 rounded-md shadow text-white font-bold"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <div className="flex flex-col justify-center h-96 gap-4 items-center max-w-sm bg-white mx-auto ">
              <div className="text-2xl text-green-500">
                <FaShoppingCart size={"1.8em"} />
              </div>
              <p className="text-xl max-w-sm">Your cart is empty</p>
              <Link
                to="/"
                className="bg-green-500 font-semibold shadow-md rounded-md text-white p-2"
              >
                START SHOPPING
              </Link>
            </div>
          )}
        </div>
        <div>
          <div className=" container mx-auto bg-white shadow-md rounded-md my-10">
            {
              <div className="flex flex-wrap -m-4 mx-5">
                {filteredProducts &&
                  filteredProducts.map((product: Product) => (
                    <StoreItem key={product.id} {...product} />
                  ))}
              </div>
            }
          </div>
        </div>
      </section>
    </>
  );
};
