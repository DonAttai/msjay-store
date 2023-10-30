import { TiShoppingCart } from "react-icons/ti";
import { useCartActions } from "../stores/cart-store";
import { Link, NavLink } from "react-router-dom";
// import { useReducer } from "react";
// import { Cart } from ".";
export const Header = () => {
  const { getCartQuantity } = useCartActions();
  const cartQuantity = getCartQuantity() || 0;

  return (
    <>
      <header className="w-screen h-16 bg-slate-900  text-white font-bold text-xl fixed z-10">
        <div className=" container mx-auto h-full flex items-center justify-between pr-8 ">
          <NavLink to="/" className="pl-2 duration-300 hover:text-green-400">
            Ms Jay Store
          </NavLink>
          <div className="flex duration-300 hover:text-green-400">
            <Link to="cart" className="text-lg">
              <TiShoppingCart size="1.8em" />
            </Link>
            <span className=" rounded-full text-base font-medium px-1">
              ({cartQuantity})
            </span>
          </div>
        </div>
      </header>
    </>
  );
};
