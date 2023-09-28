import { useCart, useCartActions } from "../stores/cart-store";
import { currencyFormatter } from "../utils/currency-formatter";
import { Product } from "../types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const StoreItem = ({ id, title, price, image }: Product) => {
  useCart();
  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    getItemQuantity,
    removeItemFromCart,
  } = useCartActions();
  const itemQuantity = getItemQuantity(+id) || 0;

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div className="bg-white rounded-lg group flex flex-col items-center justify-between py-4 min-h-[450px] shadow-md border">
        <p className="text-black font-extrabold text-xl">
          {currencyFormatter(Number(price))}
        </p>
        <div>
          <img src={image} width={200} alt={title} />
        </div>
        <div>
          {itemQuantity ? (
            <div className="flex flex-col gap-3 items-center">
              <div className="flex">
                <button
                  className="border  bg-green-800 text-white rounded-md shadow px-1 mx-2 w-8 font-extrabold text-2xl hover:bg-green-600"
                  onClick={() => {
                    toast.success("Item quantity has been updated!");
                    decreaseItemQuantity(+id);
                  }}
                >
                  -
                </button>
                <p className="text-sm  text-mute">
                  (<span className="font-bold">{itemQuantity}</span> item(s)
                  added)
                </p>
                <button
                  className="border  bg-green-800 text-white mx-2 rounded-md shadow px-1 w-8 text-2xl font-extrabold hover:bg-green-600"
                  onClick={() => {
                    increaseItemQuantity(+id);
                    toast.success("Product added successfully!");
                  }}
                >
                  +
                </button>
              </div>
              <button
                className="bg-green-800 p-2 rounded-lg text-white font-semibold hover:bg-green-600"
                onClick={() => {
                  removeItemFromCart(id);
                  toast.success("Item was removed from cart!");
                }}
              >
                REMOVE
              </button>
            </div>
          ) : (
            <button
              className="border  bg-green-800 opacity-0 text-white shadow font-semibold p-1 rounded-lg transition duration-300 group-hover:opacity-100 hover:bg-green-600"
              onClick={() => {
                increaseItemQuantity(+id);
                toast.success("Product added successfully!");
              }}
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
      <div className="text-center mt-5">
        <Link
          to={`/product/${id}`}
          className="p-2 hover:underline uppercase font-semibold"
        >
          {title}
        </Link>
      </div>
    </div>
  );
};
