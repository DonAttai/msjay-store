import { useEffect, useReducer } from "react";
import { useUser, useUserActions } from "../stores/user-store";
import { useLogin } from "../hooks/useLogin";
import toast from "react-hot-toast";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { fromError, ValidationError } from "zod-validation-error";

const loginSchema = z.object({
  username: z.string().min(1, { message: "username is required" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

import { AxiosError } from "axios";

export const Login = () => {
  const { data, isLoading, mutate, isError, isSuccess, error } = useLogin();
  const { setCredentials } = useUserActions();
  const [isPasswordShown, toggleVisibility] = useReducer(
    (prevState) => !prevState,
    false
  );

  // get user
  const user = useUser();

  //get user location
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCredentials(data);
    }
  }, [setCredentials, data]);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errorMessage: string =
          error.response?.data.message || error.message;
        toast.error(errorMessage);
      }
    }
    if (isSuccess) toast.success("Login successful!");
  }, [isError, isSuccess]);

  // onsubmit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const validatedData = loginSchema.safeParse(data);
      if (!validatedData.success) {
        const error = fromError(validatedData.error);
        throw error;
      }
      mutate(validatedData.data!);
    } catch (error) {
      if (error instanceof ValidationError) {
        toast.error(error.message, { duration: 4000, position: "top-right" });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center container mx-auto">
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center shadow-md border w-full mx-4 px-2 rounded-md gap-4 md:px-4 md:mx-0 py-10 md:w-1/3 "
        >
          <h1 className=" text-xl font-semibold text-green-500">
            Ms Jay Store
          </h1>
          <h1 className=" text-xl font-semibold text-gray-400">Sign in</h1>
          <div className="flex flex-col gap-1 mb-3 w-full">
            <label htmlFor="username" className="text-gray-400 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              id="username"
              className="shadow border p-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col relative gap-1 mb-3 w-full">
            <label
              htmlFor="password"
              className="text-gray-400 font-semibold flex justify-between"
            >
              Password
              <Link
                to="/forgot-password"
                className="font-base text-green-500 duration-300 underline hover:text-green-600 "
              >
                Forgot your password?
              </Link>
            </label>

            <input
              name="password"
              type={isPasswordShown ? "text" : "password"}
              id="password"
              placeholder="password"
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
              {isLoading ? "Wait..." : "Sign in"}
            </button>
          </div>
          {/* <Link
            to="/forgot-password"
            className="font-base text-green-500 hover:text-green-700 duration-300"
          >
            Forgot your password?
          </Link> */}
          <Link
            to="/auth/register"
            className="border border-green-400 text-center w-full text-green-400 py-2 text-lg rounded-full font-bold duration-300 hover:border-green-500 hover:text-green-600"
          >
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
};
