import { FaShoppingCart } from "react-icons/fa";
import { useCart, useCartActions } from "../stores/cart-store";
export const Header = () => {
  const { getCartQuantity } = useCartActions();
  const cartQuantity = getCartQuantity() || 0;
  const cart = useCart();

  // console.log(cart);

  return (
    <header className="w-screen h-16 bg-slate-900  text-white font-bold text-xl ">
      <div className=" container mx-auto h-full flex items-center justify-between pr-8 ">
        <div>Ms Jay Store</div>
        <button className="text-2xl relative">
          <FaShoppingCart size={"1.8em"} />
          <span className="absolute rounded-full text-xl -top-1 -right-5 bg-red-500 px-2">
            {cartQuantity}
          </span>
        </button>
      </div>
    </header>
  );
};
