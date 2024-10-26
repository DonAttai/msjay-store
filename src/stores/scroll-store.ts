// scrollStore.ts
import { create } from "zustand";

interface ScrollStore {
  positions: { [key: string]: number };
  actions: {
    savePosition: (key: string, position: number) => void;
    getPosition: (key: string) => number;
  };
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  positions: {},
  actions: {
    savePosition: (key, position) =>
      set((state) => ({
        positions: { ...state.positions, [key]: position },
      })),
    getPosition: (key) => {
      const positions = get().positions;
      return positions[key] || 0;
    },
  },
}));

export const usePosition = () => useScrollStore((state) => state.positions);
export const usePositionActions = () =>
  useScrollStore((state) => state.actions);
