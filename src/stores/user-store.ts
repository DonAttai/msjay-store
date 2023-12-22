import { create } from "zustand";
import { UserType } from "../types";

interface UserStore {
  user: UserType | null;

  actions: {
    setCredentials: (user: UserType) => void;
    logOut: () => void;
  };
}

const userInfo: UserType = JSON.parse(
  localStorage.getItem("user-credentials") as string
);

const useUserStore = create<UserStore>()((set) => ({
  user: userInfo ? userInfo : null,

  actions: {
    setCredentials: (credentials) => {
      localStorage.setItem("user-credentials", JSON.stringify(credentials));
      return set({ user: credentials });
    },
    logOut: () => {
      localStorage.removeItem("user-credentials");
      return set({ user: null });
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
