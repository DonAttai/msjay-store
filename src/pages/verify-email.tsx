import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { useUser, useUserActions } from "../stores/user-store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const VerifyEmail = () => {
  const { id, token } = useParams();
  const { data, isLoading, mutate } = useVerifyEmail();
  const { setCredentials } = useUserActions();
  const user = useUser();

  useEffect(() => {
    if (data) {
      setCredentials(data);
    }
  }, [setCredentials, data]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { id: id as string, token: token as string },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message);
          }
        },
      }
    );
  };
  return (
    <div className=" min-h-[calc(100vh-128px)] flex flex-col gap-8 justify-center items-center">
      <h2 className="text-2xl text-center">Msjay Store</h2>
      <form onSubmit={onSubmit}>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1.5 text-xl rounded-md font-bold disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "  Verify Email"}
        </button>
      </form>
    </div>
  );
};
