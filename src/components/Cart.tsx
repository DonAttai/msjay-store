import { useCart } from "../stores/cart-store";
import { useCalculateTotalPrice } from "../stores/cart-store";

import { currencyFormatter } from "../utils/currency-formatter";

import { Item } from ".";

export const Cart = () => {
  const cart = useCart();
  const totalPrice = useCalculateTotalPrice();

  if (cart.length < 1) {
    return <h3>No items in your cart</h3>;
  }
  return (
    <section>
      <h3>Cart</h3>
      <div>
        <div>
          {cart.map((cartItem) => (
            <Item key={cartItem.id} {...cartItem} />
          ))}
        </div>

        <p>Total: {currencyFormatter(totalPrice)}</p>
      </div>
    </section>
  );
};
