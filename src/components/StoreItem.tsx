import { useCartActions } from "../stores/cart-store";
import { currencyFormatter } from "../utils/currency-formatter";
import { Product } from "../types";
import { Link } from "react-router-dom";

export const StoreItem = ({ id, title, price, image }: Product) => {
  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    getItemQuantity,
    removeItemFromCart,
  } = useCartActions();
  const itemQuantity = getItemQuantity(+id) || 0;

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div className="bg-white rounded-lg  flex flex-col items-center justify-between py-4 h-96 hover:shadow-md hover:border">
        <Link
          to={`product/${id}`}
          className="p-2 hover:underline uppercase font-semibold"
        >
          {title}
        </Link>
        <p className="text-gray-400">
          {currencyFormatter(Number(price) * 905)}
        </p>
        <img src={image} height={64} width={120} alt={title} />
        <div>
          {itemQuantity ? (
            <div className="flex flex-col gap-3 items-center">
              <div>
                <button
                  className="border  bg-green-800 text-white shadow px-1 mx-2 w-6 text-2xl hover:bg-green-600"
                  onClick={() => decreaseItemQuantity(+id)}
                >
                  -
                </button>
                <button
                  className="border  bg-green-800 text-white mx-2 shadow px-1 w-6 text-2xl hover:bg-green-600"
                  onClick={() => increaseItemQuantity(+id)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-green-800 p-2 rounded-lg text-white font-semibold hover:bg-green-600"
                onClick={() => removeItemFromCart(id)}
              >
                REMOVE FROM CART
              </button>
            </div>
          ) : (
            <button
              className="border  bg-green-800 text-white shadow font-semibold p-1 rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => increaseItemQuantity(+id)}
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
