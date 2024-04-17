import { useProducts } from "../hooks/useProducts";
import { Hero, StoreItem } from "../components";
import { ProductType } from "../types";

export const Home = () => {
  const { data, isLoading, isSuccess } = useProducts();

  if (isLoading) {
    return (
      <div className="text-2xl h-[90vh] flex items-center justify-center ">
        <h1 className="2xl font-medium">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <section className="container mx-auto p-4 min-h-screen">
        <div className="flex flex-wrap -m-4">
          {isSuccess &&
            data.products.map((product: ProductType) => (
              <StoreItem key={product?._id} {...product} />
            ))}
        </div>
      </section>
    </>
  );
};
