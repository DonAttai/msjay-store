import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/react-query-hooks";
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
  const { data: products } = useProducts();
  const { id } = useParams();

  const product = products?.find((item) => item.id === +id!);
  const itemQuantity = getItemQuantity(Number(id));

  return (
    <section className="h-screen flex items-center justify-center container mx-auto">
      <div className="h-3/4 flex flex-col justify-center gap-20 items-center w-full md:flex-row">
        <div className="max-w-sm mt-64 md:mt-0">
          <img src={product?.image} width={160} alt={product?.title} />
        </div>
        <div className="max-w-sm flex flex-col items-center gap-5 p-5">
          <h3 className="uppercase font-semibold">{product?.title}</h3>
          <p>{product?.description}</p>
          <p>{product?.category}</p>
          <p className="text-black text-2xl font-bold text-center">
            {currencyFormatter(Number(product?.price) * 905)}
          </p>
          <div className="text-center">
            {itemQuantity ? (
              <div className="flex flex-col gap-3">
                <div className="flex justify-center">
                  <button
                    className="border  bg-green-800 text-white shadow px-1 mx-2 w-6 text-2xl hover:bg-green-600"
                    onClick={() => {
                      decreaseItemQuantity(Number(id));
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
                    className="border  bg-green-800 text-white mx-2 shadow px-1 w-6 text-2xl hover:bg-green-600"
                    onClick={() => {
                      increaseItemQuantity(Number(id));
                      toast.success("Product added successfully!");
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-green-800 p-2 rounded-lg text-white ml-12  font-semibold hover:bg-green-600"
                  onClick={() => {
                    removeItemFromCart(Number(id));
                    toast.success("Item was removed from cart!");
                  }}
                >
                  REMOVE
                </button>
              </div>
            ) : (
              <button
                className="p-2 bg-green-800 text-gray-100 font-semibold rounded-lg hover:bg-green-600 hover:text-white"
                onClick={() => {
                  increaseItemQuantity(Number(product?.id));
                  toast.success("Product added successfully!");
                }}
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
