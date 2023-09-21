import { useProducts } from "../hooks/react-query-hooks";
import { Hero, StoreItem } from "../components";
import { Product } from "../types";

export const Home = () => {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return <h1 className="text-2xl h-[90vh] ">Loading...</h1>;
  }
  return (
    <>
      <Hero />
      <section className="container mx-auto p-4 min-h-screen">
        <div className="flex flex-wrap -m-4">
          {products &&
            products.map((product: Product) => (
              <StoreItem key={product.id} {...product} />
            ))}
        </div>
      </section>
    </>
  );
};
