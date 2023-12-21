import { useNavigate, useParams } from "react-router-dom";
// import { useResetPassword } from "../hooks/react-query-hooks";
import { useResetPassword } from "../hooks/useResetPassword";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useUser } from "../stores/user-store";

export const ResetPassword = () => {
  const { token, id } = useParams();
  const { mutate, isLoading } = useResetPassword();
  const user = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    console.log(typeof password);

    mutate(
      { password, id: id!, token: token! },
      {
        onSuccess: () => (e!.target as HTMLFormElement)!.reset(),

        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message);
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
          className=" flex flex-col shadow-md border rounded-md gap-4 p-4 sm:w-2/3 md:w-1/3"
        >
          <h1 className="text-xl font-semibold text-center text-gray-400">
            RESET PASSWORD
          </h1>
          <div>
            <label htmlFor="password">Enter your new password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="shadow border p-2 rounded-md focus:outline-none w-full"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-1.5 text-xl rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Wait..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};
