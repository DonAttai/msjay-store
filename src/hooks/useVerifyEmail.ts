import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserType } from "../types";

// verify emaill
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({ code }: { code: string }): Promise<UserType> =>
      axiosInstance
        .post(`/auth/verify-email`, { code })
        .then((res) => res.data),
    onSuccess: () => toast.success("Acount verification successful"),
  });
};
