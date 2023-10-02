import { useProducts } from "../hooks/react-query-hooks";
import { CartItem } from "../types";
import { currencyFormatter } from "../utils/currency-formatter";
import { useCartActions } from "../stores/cart-store";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Item = ({ id, quantity }: CartItem) => {
  const { data: products } = useProducts();

  const {
    getItemQuantity,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useCartActions();

  const product = products?.find((product) => product.id === id);
  const amount = Number(product?.price) * quantity;

  return (
    <>
      <div>
        <hr className="w-full" />
      </div>
      <section className="container mx-auto mb-2 px-5 mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-5">
              <img src={product?.image} width={64} alt={product?.title} />
              <div>
                <Link
                  to={`/product/${product?.id}`}
                  className="text-lg hover:underline"
                >
                  {product?.title}
                </Link>
                <p>{currencyFormatter(Number(product?.price))}</p>
              </div>
            </div>
            <p className="text-2xl font-semibold">
              {currencyFormatter(amount)}
            </p>
          </div>

          <div className="flex justify-between items-start mb-2">
            <div className="flex text-green-600 p-2 rounded-md cursor-pointer hover:bg-green-400 hover:text-white">
              <AiOutlineDelete size="1.8em" />
              <button
                className=" rounded-md text-lg px-2 font-semibold"
                onClick={() => removeItemFromCart(id)}
              >
                Remove
              </button>
            </div>
            <div className="flex gap-4">
              <button
                className="border bg-green-800 shadow-md text-white mx-2 px-1 rounded-md w-8 text-2xl hover:bg-green-600"
                onClick={() => decreaseItemQuantity(id)}
              >
                -
              </button>
              <p>{getItemQuantity(id)}</p>
              <button
                className="border bg-green-800 text-white mx-2 shadow-md px-1 w-8 rounded-md text-2xl hover:bg-green-600"
                onClick={() => increaseItemQuantity(id)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
