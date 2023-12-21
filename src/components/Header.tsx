import { TiShoppingCart } from "react-icons/ti";
import { RxAvatar } from "react-icons/rx";
import { useCartActions } from "../stores/cart-store";
import { useUserActions, useUser } from "../stores/user-store";
import { Link, NavLink } from "react-router-dom";
import { useReducer } from "react";
// import { useReducer } from "react";
// import { Cart } from ".";
export const Header = () => {
  const { getCartQuantity } = useCartActions();

  const [isOpen, toggleDropdown] = useReducer((prevState) => !prevState, false);
  const { logOut } = useUserActions();
  const user = useUser();

  const cartQuantity = getCartQuantity() || 0;

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <header className="w-screen h-16 bg-slate-900  text-white font-bold text-xl fixed z-10">
        <div className=" container mx-auto h-full flex items-center justify-between relative pr-8 ">
          <NavLink to="/" className="pl-2 duration-300 hover:text-green-400">
            Ms Jay Store
          </NavLink>
          <div className="flex gap-5 duration-300 ">
            <div className="flex hover:text-green-400">
              <Link to="cart" className="text-lg">
                <TiShoppingCart size="1.8em" />
              </Link>
              <span className=" rounded-full text-base font-medium px-1">
                ({cartQuantity})
              </span>
            </div>
            {!user ? (
              <NavLink
                to="auth/login"
                className="pl-2 duration-300 hover:text-green-400"
              >
                Login
              </NavLink>
            ) : (
              <div className=" flex items-center gap-4 ">
                <button onClick={toggleDropdown} className="flex gap-2">
                  <RxAvatar className="text-white text-3xl cursor-pointer" />
                  <span>{capitalizeFirstLetter(user.username)}</span>
                </button>
                {isOpen && (
                  <ul className=" bg-white flex font flex-col py-2 px-4 border shadow-md absolute right-5 -bottom-14 text-black">
                    <li
                      onClick={() => {
                        logOut();
                        toggleDropdown();
                      }}
                      className="cursor-pointer text-base font-normal "
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
