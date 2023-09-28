import { FaShoppingCart } from "react-icons/fa";
import { useCartActions } from "../stores/cart-store";
import { Link, NavLink } from "react-router-dom";
// import { useReducer } from "react";
// import { Cart } from ".";
export const Header = () => {
  const { getCartQuantity } = useCartActions();
  const cartQuantity = getCartQuantity() || 0;

  return (
    <>
      {/* {isCartOpen && <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />} */}
      <header className="w-screen h-16 bg-slate-900  text-white font-bold text-xl fixed ">
        <div className=" container mx-auto h-full flex items-center justify-between pr-8 ">
          <NavLink to="/" className="pl-2">
            Ms Jay Store
          </NavLink>
          <Link to="cart" className="text-2xl relative">
            <FaShoppingCart size="1.8em" />
            <span className="absolute rounded-full text-red-500 text-sm font-extrabold top-1.5 right-2 px-1">
              {cartQuantity}
            </span>
          </Link>
        </div>
      </header>
    </>
  );
};
