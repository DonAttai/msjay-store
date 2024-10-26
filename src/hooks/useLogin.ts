import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { UserType } from "../types";
import { useUserActions } from "@/stores/user-store";

export const useLogin = () => {
  const { setCredentials } = useUserActions();
  return useMutation({
    mutationFn: (credentials: {
      email: string;
      password: string;
    }): Promise<UserType> =>
      axiosInstance.post("/auth/login", credentials).then((res) => res.data),
    onSuccess: (data) => {
      setCredentials(data);
      window.location.href = "/store";
    },
  });
};
