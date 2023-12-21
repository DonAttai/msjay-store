import { AxiosError } from "axios";
import { useForgetPassword } from "../hooks/react-query-hooks";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../stores/user-store";

export const ForgotPassword = () => {
  const { isLoading, mutate } = useForgetPassword();
  const user = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    mutate(
      { email },
      {
        onSuccess: () => (e!.target as HTMLFormElement)!.reset(),

        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message);
          }
        },
      }
    );
    e.currentTarget.reset();
  };
  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center container mx-auto">
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="flex flex-col shadow-md border rounded-md gap-4 p-4 sm:w-2/3 md:w-1/3 "
        >
          <h1 className="text-xl font-semibold text-center text-gray-400">
            FORGOT PASSWORD
          </h1>
          <div>
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              id="email"
              className="shadow border p-2 rounded-md focus:outline-none w-full"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-1.5 text-xl rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
