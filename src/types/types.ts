export type Product = {
  id: number;
  price: string;
  image: string;
  title: string;
  category: string;
  description: string;
};

export interface CartItem {
  id: number;
  quantity: number;
}

export interface User {
  email: string;
  name: string;
}
