import axiosInstance from "./axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      password,
      id,
      token,
    }: {
      password: string;
      id: string;
      token: string;
    }): Promise<{ message: string }> =>
      axiosInstance()
        .post(`/auth/reset-password/${id}/${token}`, { password })
        .then((res) => res.data),
    onSuccess: (data: { message: string }) => toast.success(data.message),
  });
};
