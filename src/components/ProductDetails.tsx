import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/react-query-hooks";
import { currencyFormatter } from "../utils/currency-formatter";
import { useCartActions } from "../stores/cart-store";
export const ProductDetails = () => {
  const {
    increaseItemQuantity,
    getItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useCartActions();
  const { data: products } = useProducts();
  const { id } = useParams();

  const product = products?.find((item) => item.id === +id!);
  const itemQuantity = getItemQuantity(Number(id));

  return (
    <section className="h-screen flex items-center justify-center container mx-auto">
      <div className="h-3/4 flex flex-col justify-center gap-20 items-center w-full md:flex-row">
        <div className="max-w-sm">
          <img src={product?.image} width={160} alt={product?.title} />
        </div>
        <div className="max-w-sm flex flex-col gap-5">
          <h3 className="uppercase font-semibold">{product?.title}</h3>
          <p>{product?.description}</p>
          <p>{product?.category}</p>
          <p className="text-gray-400">
            {currencyFormatter(Number(product?.price) * 905)}
          </p>
          <div>
            {itemQuantity ? (
              <div className="flex flex-col gap-3 items-center">
                <div>
                  <button
                    className="border  bg-green-800 text-white shadow px-1 mx-2 w-6 text-2xl hover:bg-green-600"
                    onClick={() => decreaseItemQuantity(Number(id))}
                  >
                    -
                  </button>
                  <button
                    className="border  bg-green-800 text-white mx-2 shadow px-1 w-6 text-2xl hover:bg-green-600"
                    onClick={() => increaseItemQuantity(Number(id))}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-green-800 p-2 rounded-lg text-white font-semibold hover:bg-green-600"
                  onClick={() => removeItemFromCart(Number(id))}
                >
                  REMOVE FROM CART
                </button>
              </div>
            ) : (
              <button
                className="p-2 bg-green-800 text-gray-100 font-semibold rounded-lg hover:bg-green-600 hover:text-white"
                onClick={() => increaseItemQuantity(Number(product?.id))}
              >
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
