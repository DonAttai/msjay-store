import { TiShoppingCart } from "react-icons/ti";
import { useUserActions, useUser } from "../stores/user-store";
import { Link, NavLink } from "react-router-dom";
import { useCartQuantity } from "../hooks/useCart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Lock, LogIn, CircleUser } from "lucide-react";
import { Role } from "@/lib/utils";
import { Button } from "./ui/button";
export const Header = () => {
  const user = useUser();
  const cartQuantity = useCartQuantity();

  const { logOut } = useUserActions();

  return (
    <>
      <header className="w-screen h-16 bg-slate-900  text-white font-bold text-xl fixed z-10">
        <div className=" container mx-auto h-full flex items-center justify-between relative sm:pr-8 ">
          <NavLink to="/" className="pl-2 duration-300 hover:text-green-400">
            Ms Jay Store
          </NavLink>
          <div className="flex gap-2 duration-300 sm:gap-5 sm:pr-16">
            <div className="flex hover:text-green-400">
              <Link to="cart" className="text-lg">
                <TiShoppingCart size="1.8em" />
              </Link>
              <span className=" rounded-full text-base font-medium px-1">
                ({cartQuantity || 0})
              </span>
            </div>
            {!user ? (
              <NavLink
                to="auth/login"
                className="pl-2 duration-300 hover:text-green-400"
              >
                {/* Login */}
                <Button variant="ghost" className="text-lg font-bold">
                  <LogIn className="h-4 w-4 mr-1 font-bold" />
                  Login
                </Button>
              </NavLink>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CircleUser className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuLabel>{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  {user?.role === Role.ADMIN && (
                    <DropdownMenuItem asChild>
                      <Link to="admin/dashboard">
                        <Lock className="mr-2 h-4 w-4" />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span onClick={logOut}>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
