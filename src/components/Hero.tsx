import { Link } from "react-router-dom";
import { useProducts } from "../hooks/react-query-hooks";
import { useCallback, useEffect, useRef, useState } from "react";

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const { data: products } = useProducts();

  const productList = products
    ?.filter((product) => product.category === "women's clothing")
    ?.map((product) => ({ id: product.id, image: product.image }));

  const nextSlide = useCallback(() => {
    const lastSlide = currentIndex === (productList && productList?.length - 1);
    const nextIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }, [currentIndex, productList]);

  useEffect(() => {
    console.log("use effect");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 2000);

    return () => clearTimeout(timerRef.current as number);
  }, [nextSlide]);

  return (
    <div className="container mx-auto flex justify-center items-center bg-blue-50 p-4 mt-4">
      <div className="w-80 h-96 flex justify-center items-center relative bg-white">
        <div
          style={{
            backgroundImage: `url(${
              productList && productList[currentIndex].image
            })`,
          }}
          className="w-2/4 h-3/4 bg-cover bg-center"
        ></div>

        <Link
          to={`/product/`}
          className="absolute bg-green-400 p-2 rounded-md font-bold text-white bottom-10 translate-y-[-50%] right-16 text-xl duration-500 hover:bg-transparent hover:text-green-600"
        >
          BUY NOW!
        </Link>
      </div>
    </div>
  );
};
