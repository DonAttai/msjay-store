import { create } from "zustand";
import { UserType } from "../types";

interface UserStore {
  user: UserType | null;
  guestEmail: string;

  actions: {
    setCredentials: (user: UserType | null) => void;
    logOut: () => void;
    setGuestEmail: (email: string) => void;
  };
}

const userInfo: UserType = JSON.parse(
  localStorage.getItem("user-credentials") as string
);

export const useUserStore = create<UserStore>()((set) => ({
  user: userInfo ? userInfo : null,
  guestEmail: "",

  actions: {
    setGuestEmail: (email) => set({ guestEmail: email }),

    setCredentials: (user) => {
      localStorage.setItem("user-credentials", JSON.stringify(user));
      set({ user });
    },
    logOut: () => {
      localStorage.removeItem("user-credentials");
      set({ user: null });
      window.location.href = "/auth/login";
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);

// guest user
export const useGuestEmail = () => useUserStore((state) => state.guestEmail);
