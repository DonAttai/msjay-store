import { create } from "zustand";
import { User } from "../types";

interface UserStore {
  user: User | null;

  actions: {
    setCredentials: (user: User) => void;
  };
}

const user: User = JSON.parse(
  localStorage.getItem("user-credentials") as string
);

const useUserStore = create<UserStore>()((set) => ({
  user: user ? user : null,

  actions: {
    setCredentials: (credentials) => {
      localStorage.setItem("user-credentials", JSON.stringify(credentials));
      return set({ user: credentials });
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
