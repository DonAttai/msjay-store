import { Link } from "react-router-dom";
import { useProducts } from "../hooks/react-query-hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const { data: products } = useProducts();

  const productList = products
    ?.filter((product) => product.category === "women's clothing")
    ?.map((product) => ({
      id: product.id,
      image: product.image,
      title: product.title,
    }));

  const nextSlide = useCallback(() => {
    const lastSlide = currentIndex === (productList && productList?.length - 1);
    const nextIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }, [currentIndex, productList]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 3000);

    return () => clearTimeout(timerRef.current as number);
  }, [nextSlide]);

  return (
    <div className="container mx-auto flex justify-center items-center  bg-blue-50 mt-4 ">
      <div className="w-48 h-80 overflow-hidden my-4">
        <div className=" flex w-full h-full relative">
          {productList?.map((product) => (
            <React.Fragment key={product.id}>
              <img
                key={product.id}
                src={productList[currentIndex].image}
                className="flex w-full h-full rounded-md shadow-md"
                alt={productList[currentIndex].title}
              />
              <Link
                to={`/product/${productList[currentIndex].id}`}
                className="absolute bg-green-400 px-2 py-1  shadow rounded-md font-bold text-white bottom-20 translate-y-[-50%] right-10 text-lg duration-400 hover:bg-green-600"
              >
                BUY NOW!
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
