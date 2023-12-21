import { TiShoppingCart } from "react-icons/ti";
import { RxAvatar } from "react-icons/rx";
import { useCartActions } from "../stores/cart-store";
import { useUserActions, useUser } from "../stores/user-store";
import { Link, NavLink } from "react-router-dom";
import { useReducer } from "react";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
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
                </button>
                {isOpen && (
                  <div className="w-2/3  absolute bg-red-500 -bottom-40 right-10 md:w-1/3">
                    <ul className="h-100 bg-white flex text-xl font-normal flex-col py-4 px-4 border shadow-md text-black">
                      <li className="font-medium text-2xl bto">
                        {capitalizeFirstLetter(user.username)}
                      </li>
                      <hr className="w-full mb-2" />
                      <li
                        className="cursor-pointer flex gap-2 items-center mb-3"
                        onClick={() => toggleDropdown()}
                      >
                        <CiSettings />
                        Settings
                      </li>
                      <li
                        onClick={() => {
                          logOut();
                          toggleDropdown();
                        }}
                        className="cursor-pointer flex items-center gap-2 mb-3"
                      >
                        <CiLogout className="font-bold" />
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
