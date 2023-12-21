import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useProducts } from "../hooks/react-query-hooks";
import { CartItem } from "../types";

interface CartStore {
  cart: CartItem[];
  actions: {
    removeItemFromCart: (id: string) => void;
    increaseItemQuantity: (id: string) => void;
    decreaseItemQuantity: (id: string) => void;
    getItemQuantity: (id: string) => number;
    getCartQuantity: () => number;
    clearCart: () => void;
  };
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],

        actions: {
          clearCart: () => set({ cart: [] }),

          removeItemFromCart: (id) =>
            set((state) => ({
              cart: state.cart.filter((item) => item.id !== id),
            })),

          increaseItemQuantity: (id) => {
            const cart = get().cart;
            const cartItem = cart.find((item) => item.id === id);

            if (cartItem) {
              return set((state) => ({
                cart: state.cart.map((item) =>
                  item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              }));
            } else {
              return set((state) => ({
                cart: [...state.cart, { id, quantity: 1 }],
              }));
            }
          },

          decreaseItemQuantity: (id) => {
            const cart = get().cart;
            const cartItem = cart.find((item) => item.id === id);

            if (cartItem?.quantity === 1) {
              return set((state) => ({
                cart: state.cart.filter((item) => item.id !== cartItem.id),
              }));
            } else {
              return set((state) => ({
                cart: state.cart.map((item) =>
                  item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
              }));
            }
          },

          getItemQuantity: (id) => {
            const cart = get().cart;
            const quantity = cart.find((item) => item.id === id)?.quantity || 0;
            return quantity;
          },

          getCartQuantity: () => {
            const cart = get().cart;
            return cart.reduce((quantity, item) => item.quantity + quantity, 0);
          },
        },
      }),
      {
        name: "cart",
        partialize: (state) => ({ cart: state.cart }),
      }
    )
  )
);

export const useCart = () => useCartStore((state) => state.cart);
export const useCartActions = () => useCartStore((state) => state.actions);

//calculate total price
export const useCalculateTotalPrice = () => {
  const cart = useCart();
  const { data } = useProducts();
  return cart.reduce((total, cartItem) => {
    const product = data?.products.find((item) => item._id === cartItem.id);
    return total + (Number(product?.price) || 0) * cartItem.quantity;
  }, 0);
};
