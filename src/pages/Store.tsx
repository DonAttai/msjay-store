import { useProducts } from "../hooks/react-query-hooks";
import { StoreItem } from "../components";
import { Product } from "../types";
import { useCalculateTotalPrice } from "../stores/cart-store";

export const Home = () => {
  const { data: products } = useProducts();

  const totalPrice = useCalculateTotalPrice();
  console.log(totalPrice);

  return (
    <section className="container mx-auto p-4">
      <div className="flex flex-wrap -m-4">
        {products &&
          products.map((product: Product) => (
            <StoreItem key={product.id} {...product} />
          ))}
      </div>
    </section>
  );
};
