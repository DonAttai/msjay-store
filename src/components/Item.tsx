import { useProducts } from "../hooks/react-query-hooks";
import { CartItem } from "../types";
import { currencyFormatter } from "../utils/currency-formatter";

export const Item = ({ id, quantity }: CartItem) => {
  const { data: products } = useProducts();

  const product = products?.find((product) => product.id === id);
  const amount = Number(product?.price) * quantity;

  return (
    <section className="container mx-auto">
      <div className="flex justify-between">
        <div className="flex">
          <img src={product?.image} width={32} alt={product?.title} />
          <p>x{quantity}</p>
        </div>
        <div>
          <p>{currencyFormatter(amount)}</p>
        </div>
      </div>
    </section>
  );
};
