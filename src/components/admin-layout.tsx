import { Link, NavLink, Outlet } from "react-router-dom";
import {
  CircleUser,
  LogOut,
  Menu,
  Package2,
  Settings,
  Store,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useUser, useUserActions } from "@/stores/user-store";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
  const user = useUser();
  const { logOut } = useUserActions();
  return (
    <main>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <NavLink
            to="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">MsJay Store</span>
          </NavLink>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              cn(
                "text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground"
              )
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              cn(
                "text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground"
              )
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              cn(
                "text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground"
              )
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              cn(
                "text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground"
              )
            }
          >
            Customers
          </NavLink>
          {/* <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              cn(
                "text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground"
              )
            }
          >
            Analytics
          </NavLink> */}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="grid gap-6 text-lg font-medium">
              <SheetClose asChild>
                <NavLink
                  to="dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Ms Jay Store</span>
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink to="dashboard" className="hover:text-foreground">
                  Dashboard
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink
                  to="/admin/orders"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink
                  to="/admin/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Products
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink
                  to="/admin/customers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Customers
                </NavLink>
              </SheetClose>
              {/* <SheetClose asChild>
                <NavLink
                  to="/admin/analytics"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Analytics
                </NavLink>
              </SheetClose> */}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{`${user?.firstName} ${user?.lastName}`}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link to="/store">
                  <Store className="mr-2 h-4 w-4" />
                  <span>Store</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={logOut}>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
