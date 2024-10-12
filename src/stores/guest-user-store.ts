import { GuestAddressType } from "@/components/guest/guest-shipping-address-form";
import { create } from "zustand";

interface GuestUserStore {
  guestAddress: GuestAddressType | null;

  actions: {
    setGuestAddress: (guestAddress: GuestAddressType | null) => void;
  };
}

const address = JSON.parse(localStorage.getItem("guest-address") as string);

const userGuestUserStore = create<GuestUserStore>()((set) => ({
  guestAddress: address ? address : null,

  actions: {
    setGuestAddress: (guestAddress: GuestAddressType | null) => {
      localStorage.setItem("guest-address", JSON.stringify(guestAddress));
      set({ guestAddress });
    },
  },
}));

export const useGuestAddress = () =>
  userGuestUserStore((state) => state.guestAddress);

export const useGuestActions = () =>
  userGuestUserStore((state) => state.actions);
