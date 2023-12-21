import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axios";
import toast from "react-hot-toast";

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (userData: { email: string }): Promise<{ message: string }> =>
      axiosInstance()
        .post("/auth/forget-password", userData)
        .then((res) => {
          return res.data;
        }),
    onSuccess: (data: { message: string }) => toast.success(data.message),
  });
};
