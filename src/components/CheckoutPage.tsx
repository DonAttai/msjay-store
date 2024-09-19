import { useCalculateTotalPrice, useCart } from "@/hooks/useCart";
import EmptyCart from "./empty-cart";
import { useUser } from "@/stores/user-store";
import { Link } from "react-router-dom";
import { useCustomerAddress } from "@/hooks/useAddress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ProductType, UserType } from "@/types";
import { currencyFormatter } from "@/lib/currency-formatter";
import { ShippingAddress } from "./shipping-address";
import { useReducer } from "react";
import { AddAddressDialog } from "./add-address-dialog";
import { useProducts } from "@/hooks/useProducts";
import { PayWithPaystack } from "./PayWithPaystack";
import { Button } from "./ui/button";

export const CheckoutPage = () => {
  const [isAddressModalOpen, toggleAddressModal] = useReducer(
    (prev) => !prev,
    false
  );
  const { data: cart, isLoading: isLoadingCart } = useCart();
  const { data } = useProducts();
  const user = useUser() as UserType;
  const totalPrice = useCalculateTotalPrice() as number;

  const { data: address } = useCustomerAddress(user?._id);

  // get items in cart
  const cartItems = cart?.products.map((item) => {
    const cartItems = data?.products.find(
      (product) => product?._id === item.productId
    );
    return { ...(cartItems as ProductType), quantity: item.quantity };
  });

  // user is not authenticated ui
  if (!user) {
    return (
      <div className=" pt-4 min-h-[calc(100vh-128px)] bg-slate-100 flex flex-col items-center justify-center">
        <div className="mb-2 text-lg">
          You have to login to successfully checkout
        </div>
        <Link to="/auth/login">
          <Button className="bg-green-400  text-white text-xl font-bold rounded-md hover:bg-green-600">
            Login
          </Button>
        </Link>
      </div>
    );
  }
  // user is not verified ui
  if (user && !user?.isVerified) {
    return (
      <div className=" pt-4 min-h-[calc(100vh-128px)] bg-slate-100 flex flex-col items-center justify-center">
        <div>
          You have not verified your account. Click on the link sent to your
          e-mail to verify your account.
        </div>
        <Link to="/">Back To Store</Link>
      </div>
    );
  }
  if (isLoadingCart) {
    return (
      <section className=" pt-4 min-h-[calc(100vh-128px)] bg-slate-100 flex flex-col items-center justify-center">
        <p className="text-3xl">Loading...</p>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-128px)] bg-slate-100  flex flex-col items-center justify-center">
      {cart?.products.length ? (
        <Card className="max-w-[425px] h-fit">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <p>Order Summary</p>
              <Link
                to="/cart"
                className="text-sm text-green-400 hover:text-green-600"
              >
                View Details
              </Link>
            </CardTitle>
            <hr />
          </CardHeader>
          <CardContent>
            <ul className="">
              {cartItems &&
                cartItems.map((item) => (
                  <li key={item?._id!} className="flex justify-between mb-4">
                    <span>
                      {item?.title} (x{item.quantity})
                    </span>
                    <span>
                      {currencyFormatter(item?.price * item.quantity)}
                    </span>
                  </li>
                ))}
            </ul>
            <div className="flex justify-between mb-2">
              <p>Order Subtotal</p>
              <p className="">{currencyFormatter(totalPrice as number)}</p>
            </div>
            <hr className="mb-2" />
            <div className="flex justify-between  mb-2">
              <p>Total Amount</p>
              <p className="">{currencyFormatter(totalPrice as number)}</p>
            </div>
            <ShippingAddress />
          </CardContent>

          <CardFooter>
            {address ? (
              <PayWithPaystack />
            ) : (
              <AddAddressDialog
                isOpen={isAddressModalOpen}
                toggleModal={toggleAddressModal}
              />
            )}
          </CardFooter>
        </Card>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
};
