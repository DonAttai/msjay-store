import { FaShoppingCart } from "react-icons/fa";
import { useCartActions } from "../stores/cart-store";
import { NavLink } from "react-router-dom";
export const Header = () => {
  const { getCartQuantity } = useCartActions();
  const cartQuantity = getCartQuantity() || 0;

  return (
    <header className="w-screen h-16 bg-slate-900  text-white font-bold text-xl fixed ">
      <div className=" container mx-auto h-full flex items-center justify-between pr-8 ">
        <NavLink to="/" className="pl-2">
          Ms Jay Store
        </NavLink>
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
