import { create } from "zustand";

interface OrderStore {
  isPayNowDisabled: boolean;

  actions: {
    togglePayNow: () => void;
  };
}

const useOrderStore = create<OrderStore>()((set) => ({
  isPayNowDisabled: true,
  actions: {
    togglePayNow: () =>
      set((state) => ({
        isPayNowDisabled: !state.isPayNowDisabled,
      })),
  },
}));

export const useIsDisabled = () =>
  useOrderStore((state) => state.isPayNowDisabled);

export const useTogglePayNow = () => useOrderStore((state) => state.actions);
