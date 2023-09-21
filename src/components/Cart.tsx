//import react-hooks
import { useEffect, useRef } from "react";

// import cart-store hooks
import {
  useCart,
  useCartActions,
  useCalculateTotalPrice,
} from "../stores/cart-store";

//import currencYFormatter
import { currencyFormatter } from "../utils/currency-formatter";

//import components
import { Item } from ".";

interface CartProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

export const Cart = ({ isCartOpen, toggleCart }: CartProps) => {
  const { getCartQuantity, clearCart } = useCartActions();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const cart = useCart();
  //close cart
  const closeCart = () => {
    dialogRef.current?.close();
    toggleCart();
  };
  const totalPrice = useCalculateTotalPrice();

  useEffect(() => {
    if (isCartOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isCartOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="mr-0 mt-0  w-full md:max-w-[35vw] xl:max-w-[30vw] p-4"
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xl font-semibold">
          Shopping Cart ({getCartQuantity()})
        </h3>
        <button onClick={closeCart} className="text-5xl px-2">
          &times;
        </button>
      </div>
      <hr className="text-gray-500 font-bold w-full mb-4" />
      <div>
        {cart.length ? (
          <section>
            <div>
              <div>
                {cart.map((cartItem) => (
                  <Item key={cartItem.id} {...cartItem} />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold">
                Total: {currencyFormatter(totalPrice)}
              </p>
              <button
                onClick={() => clearCart()}
                className="p-2 bg-red-600 rounded-md shadow text-white font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </section>
        ) : (
          <h3 className="text-2xl">Your Cart is empty</h3>
        )}
      </div>
    </dialog>
  );
};
