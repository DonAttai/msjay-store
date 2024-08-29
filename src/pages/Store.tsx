import { useProducts } from "../hooks/useProducts";
import { Hero, StoreItem } from "../components";
import { ProductType } from "../types";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const { data, isLoading, isSuccess } = useProducts();

  // keys to filter product by
  const keys = ["category", "title", "description"] as const;

  // get filtered products
  const filteredProducts = data?.products.filter((product) =>
    keys.some((key) => product[key].toLowerCase().includes(q!.toLowerCase()))
  );

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
      <div className="flex justify-center">
        <input
          type="search"
          defaultValue={q!}
          placeholder="search by category, title"
          className="p-2 outline-none border-2 rounded-md"
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("q", e.target.value);
              return prev;
            })
          }
        />
      </div>
      <section className="container mx-auto p-4 min-h-screen">
        <div className="flex flex-wrap -m-4">
          {isSuccess &&
            filteredProducts?.map((product: ProductType) => (
              <StoreItem key={product?._id} {...product} />
            ))}
        </div>
      </section>
    </>
  );
};
