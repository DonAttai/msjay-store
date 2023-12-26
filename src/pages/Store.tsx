import { useProducts } from "../hooks/useProducts";
import { Hero, StoreItem } from "../components";
import { ProductType } from "../types";
import { useCallback, useEffect, useRef } from "react";

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isSuccess } =
    useProducts();

  const ref = useRef<HTMLDivElement | null>(null);
  const handleIntersection = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && hasNextPage) fetchNextPage();
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    const target = ref?.current;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "100px",
    });

    if (target) observer.observe(target);

    return () => {
      if (target) observer?.unobserve(target);
    };
  });

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
            data.pages?.flatMap((page) =>
              page.products.map((product: ProductType) => {
                return <StoreItem key={product?._id} {...product} />;
              })
            )}
        </div>
        <div ref={ref}></div>
      </section>
    </>
  );
};
