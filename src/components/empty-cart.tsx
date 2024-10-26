import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className=" flex flex-col justify-center rounded-md h-96 gap-4 items-center max-w-sm bg-white mx-auto ">
      <div className="text-2xl text-green-500">
        <FaShoppingCart size={"1.8em"} />
      </div>
      <p className="text-xl max-w-sm">Your cart is empty</p>
      <Link
        to="/store"
        className="bg-green-500 font-semibold shadow-md rounded-md text-white p-2 hover:bg-green-700"
      >
        START SHOPPING
      </Link>
    </div>
  );
}
