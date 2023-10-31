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
    <div className="container mx-auto flex justify-center items-center bg-blue-50 mt-4 ">
      <div className="w-[200px] h-[300px] flex justify-center items-center relative m-2">
        <div
          style={{
            // padding: "1px",
            backgroundImage: `url(${
              productList && productList[currentIndex].image
            })`,
          }}
          className="w-full h-full bg-cover bg-center bg-clip-content rounded-md "
        ></div>

        <Link
          to={`/product/`}
          className="absolute bg-green-400 p-1 rounded-md font-bold text-white bottom-10 translate-y-[-50%] right-10 text-lg duration-500 hover:bg-transparent hover:text-green-600"
        >
          BUY NOW!
        </Link>
      </div>
    </div>
  );
};
