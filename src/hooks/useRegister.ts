import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }): Promise<{ success: boolean; message: string }> =>
      axiosInstance.post("/auth/register", credentials).then((res) => res.data),
  });
};
