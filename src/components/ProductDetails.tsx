import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { currencyFormatter } from "../utils/currency-formatter";
import {
  useAddToCart,
  useCartItemQuantity,
  useDecreaseCartItemQuantity,
  useRemoveItemFromCart,
} from "../hooks/useCart";
export const ProductDetails = () => {
  const { data } = useProducts();
  const { id: productId } = useParams();

  const { mutate: addTocart } = useAddToCart();
  const product = data?.products?.find((item) => item._id === productId);
  const itemQuantity = useCartItemQuantity(productId as string);
  const { mutate: decreaseItemQuantity } = useDecreaseCartItemQuantity(
    productId as string
  );
  const { mutate: removeItemFromCart } = useRemoveItemFromCart();

  return (
    <section className="min-h-[calc(100vh-128px)] flex items-center justify-center container mx-auto">
      <div className="h-full flex flex-col justify-center gap-5 items-center w-full md:flex-row">
        <div className="flex-1 h-full flex items-center">
          <img
            src={product?.image}
            width={400}
            alt={product?.title}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 h-full flex items-center justify-left">
          <div className="max-w-sm flex flex-col gap-5 p-2">
            <h3 className="uppercase font-semibold text-2xl">
              {product?.title}
            </h3>
            <p>{product?.description}</p>
            <p className="text-gray-500">{product?.category}</p>
            <p className="text-black text-2xl font-bold text-center">
              Unit Price: {currencyFormatter(Number(product?.price))}
            </p>
            <div className="self-center">
              {itemQuantity ? (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-center">
                    <button
                      className="border bg-green-500 text-white rounded-md shadow-md px-1 mx-2 w-8 text-2xl duration-300 hover:bg-green-700"
                      onClick={() => {
                        decreaseItemQuantity();
                      }}
                    >
                      -
                    </button>
                    <p className="text-sm  text-mute">
                      (<span className="font-bold">{itemQuantity}</span>
                      {itemQuantity > 1 ? " quantities" : " quantity"} in cart)
                    </p>
                    <button
                      className="border bg-green-500 text-white rounded-md mx-2 shadow-md px-1 w-8 text-2xl duration-300 hover:bg-green-700"
                      onClick={() => {
                        addTocart({ productId: productId as string });
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-green-500  py-2 px-4 rounded-lg text-white ml-12 font-semibold duration-300 hover:bg-green-700"
                      onClick={() => {
                        removeItemFromCart({ productId: productId as string });
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="p-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 hover:text-white"
                  onClick={() => addTocart({ productId: productId as string })}
                >
                  ADD TO CART
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
