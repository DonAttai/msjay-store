export type ProductType = {
  _id: string;
  price: string;
  image: string;
  title: string;
  category: string;
  description: string;
};
export interface IProduct {
  page: string;
  size: string;
  products: ProductType[];
}

export interface CartItem {
  id: string;
  quantity: number;
}

export interface User {
  email: string;
  name: string;
}
