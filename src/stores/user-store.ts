import { create } from "zustand";
import { UserType } from "../types";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface UserStore {
  user: UserType | null;

  actions: {
    setCredentials: (user: UserType | null) => void;
    logOut: () => void;
  };
}

const userInfo: UserType = JSON.parse(
  localStorage.getItem("user-credentials") as string
);

export const useUserStore = create<UserStore>()((set) => ({
  user: userInfo ? userInfo : null,

  actions: {
    setCredentials: (user) => {
      localStorage.setItem("user-credentials", JSON.stringify(user));
      set({ user });
    },

    logOut: async () => {
      try {
        await axiosInstance.post(`/auth/logout`);
        localStorage.removeItem("user-credentials");
        set({ user: null });
        window.location.href = "/auth/login";
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
