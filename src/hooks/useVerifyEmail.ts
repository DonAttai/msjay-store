import axiosInstance from "./axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserType } from "../types";

// verify emaill
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({
      id,
      token,
    }: {
      id: string;
      token: string;
    }): Promise<UserType> =>
      axiosInstance()
        .post(`/auth/verify-email/${id}/${token}`, { token })
        .then((res) => res.data),
    onSuccess: () => toast.success("Acount verification successful"),
  });
};
