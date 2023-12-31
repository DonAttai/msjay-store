import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { currencyFormatter } from "../utils/currency-formatter";
import { useCartActions, useCart } from "../stores/cart-store";
import toast from "react-hot-toast";
export const ProductDetails = () => {
  useCart();
  const {
    increaseItemQuantity,
    getItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useCartActions();
  const { data } = useProducts();
  const { id } = useParams();

  const product = data?.products?.find((item) => item._id === id);
  const itemQuantity = getItemQuantity(id!);

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
                        decreaseItemQuantity(id!);
                        toast.success("Item quantity has been updated!");
                      }}
                    >
                      -
                    </button>
                    <p className="text-sm  text-mute">
                      (<span className="font-bold">{itemQuantity}</span> item(s)
                      added)
                    </p>
                    <button
                      className="border bg-green-500 text-white rounded-md mx-2 shadow-md px-1 w-8 text-2xl duration-300 hover:bg-green-700"
                      onClick={() => {
                        increaseItemQuantity(id!);
                        toast.success("Product added successfully!");
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-green-500  py-2 px-4 rounded-lg text-white ml-12 font-semibold duration-300 hover:bg-green-700"
                      onClick={() => {
                        removeItemFromCart(id!);
                        toast.success("Item was removed from cart!");
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="p-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 hover:text-white"
                  onClick={() => {
                    increaseItemQuantity(product?._id as string);
                  }}
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
