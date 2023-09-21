import { useProducts } from "../hooks/react-query-hooks";
import { CartItem } from "../types";
import { currencyFormatter } from "../utils/currency-formatter";

export const Item = ({ id, quantity }: CartItem) => {
  const { data: products } = useProducts();

  const product = products?.find((product) => product.id === id);
  const amount = Number(product?.price) * quantity;

  return (
    <section className="container mx-auto mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={product?.image} width={64} alt={product?.title} />
          <p>x{quantity}</p>
        </div>
        <div>
          <p>{currencyFormatter(Number(product?.price))}</p>
        </div>
        <div>
          <p>{currencyFormatter(amount)}</p>
        </div>
      </div>
    </section>
  );
};
