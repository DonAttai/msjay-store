import toast from "react-hot-toast";
import axiosInstance from "./axios";
import { useMutation } from "@tanstack/react-query";
import { UserType } from "../types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: {
      username: string;
      password: string;
    }): Promise<UserType> =>
      axiosInstance()
        .post("/auth/login", credentials)
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Login successful!");
    },
  });
};
