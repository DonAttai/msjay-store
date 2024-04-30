import axiosInstance from "./axios";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: {
      username: string;
      password: string;
      email: string;
    }): Promise<{ message: string }> =>
      axiosInstance()
        .post("/auth/register", credentials)
        .then((res) => res.data),
  });
};
