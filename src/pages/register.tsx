import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";
// import { useRegister } from "../hooks/react-query-hooks";
import { useRegister } from "../hooks/useRegister";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useUser } from "../stores/user-store";

export const Register = () => {
  const { isLoading, mutate } = useRegister();

  const user = useUser();

  const [isPasswordShown, toggleVisibility] = useReducer(
    (prevState) => !prevState,
    false
  );

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  });

  // onsubmit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = {
      password: formData.get("password") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    };

    mutate(
      { ...userData },
      {
        onSuccess: () => {
          (e.target as HTMLFormElement)!.reset();
          navigate("/auth/login");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message);
          } else {
            toast.error("something went wrong!");
          }
        },
      }
    );
  };
  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center container mx-auto">
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full px-2 mx-2 items-center shadow-md border border-gray-300 rounded-md py-10 gap-4 md:px-4 md:mx-0 md:w-1/3 "
        >
          <h1 className=" text-xl font-semibold text-green-500">
            Ms Jay Store
          </h1>
          <h1 className=" text-xl font-semibold text-gray-400">
            Create account
          </h1>
          <div className="flex flex-col mb-3 w-full">
            <label htmlFor="username" className="text-gray-400 font-semibold">
              Username:
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              id="username"
              className="shadow border p-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col mb-3 w-full">
            <label htmlFor="email" className="text-gray-400 font-semibold">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              id="email"
              className="shadow border p-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col relative mb-3 w-full">
            <label htmlFor="password" className="text-gray-400 font-semibold">
              Password:
            </label>
            <input
              name="password"
              type={isPasswordShown ? "text" : "password"}
              id="password"
              placeholder="At least 8 characters"
              className="shadow border p-2 rounded-md focus:outline-none"
            />
            {isPasswordShown ? (
              <FaRegEye
                onClick={toggleVisibility}
                className="absolute right-10 bottom-2 text-gray-500 cursor-pointer text-2xl"
              />
            ) : (
              <FaRegEyeSlash
                onClick={toggleVisibility}
                className="absolute right-10 bottom-2 text-gray-500 cursor-pointer text-2xl"
              />
            )}
          </div>
          <div className="text-center w-full">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 w-full text-white py-2 text-lg rounded-full font-bold duration-300 disabled:opacity-50 hover:bg-green-700 disabled:cursor-not-allowed"
            >
              {isLoading ? "Wait..." : "Continue"}
            </button>
          </div>
          <Link to="/auth/login" className="justify-self-start">
            Already have an account?
            <span className="text-green-500"> sign in</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
