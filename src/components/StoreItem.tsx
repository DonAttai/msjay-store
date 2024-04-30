import { currencyFormatter } from "../utils/currency-formatter";
import { ProductType } from "../types";
import { Link } from "react-router-dom";
import {
  useAddToCart,
  useCartItemQuantity,
  useDecreaseCartItemQuantity,
  useRemoveItemFromCart,
} from "../hooks/useCart";

export const StoreItem = ({
  _id: productId,
  title,
  price,
  image,
}: ProductType) => {
  const { mutate, isLoading } = useAddToCart();
  const cartItemQuantity = useCartItemQuantity(productId);
  const { mutate: decreaseItemQuantity } =
    useDecreaseCartItemQuantity(productId);
  const { mutate: removeItemFromCart } = useRemoveItemFromCart();
  // const { removeItemFromCart } = useCartActions();

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div className="bg-white rounded-lg group flex flex-col items-center justify-between py-4 min-h-[450px] shadow-md border">
        <p className="text-black font-extrabold text-xl">
          {currencyFormatter(Number(price))}
        </p>
        <figure>
          <img src={image} width={200} alt={title} />
        </figure>
        <div>
          {cartItemQuantity ? (
            <div className="flex flex-col gap-3 items-center">
              <div className="flex">
                <button
                  className="border  bg-green-500 text-white rounded-md shadow px-1 mx-2 w-8 font-extrabold text-2xl hover:bg-green-700"
                  onClick={() => decreaseItemQuantity()}
                >
                  -
                </button>
                <p className="text-sm  text-mute">
                  (<span className="font-bold">{cartItemQuantity}</span>
                  {cartItemQuantity > 1 ? " quantities" : " quantity"} in cart)
                </p>
                <button
                  className="border  bg-green-500 text-white mx-2 rounded-md shadow px-1 w-8 text-2xl font-extrabold hover:bg-green-800"
                  onClick={() => mutate({ productId })}
                >
                  +
                </button>
              </div>
              <button
                className="bg-green-500 p-2 rounded-lg text-white font-semibold hover:bg-green-700"
                onClick={() => removeItemFromCart({ productId })}
              >
                REMOVE
              </button>
            </div>
          ) : (
            <button
              className={`border  bg-green-500 opacity-0 text-white shadow font-semibold p-1 rounded-lg transition duration-300 group-hover:opacity-100 hover:bg-green-700 ${
                isLoading ? "bg-green-200 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              onClick={() => mutate({ productId })}
            >
              {isLoading ? "adding to cart..." : "ADD TO CART"}
            </button>
          )}
        </div>
      </div>
      <div className="text-center mt-5">
        <Link
          to={`/product/${productId}`}
          className="p-2 hover:underline uppercase font-semibold"
        >
          {title}
        </Link>
      </div>
    </div>
  );
};
