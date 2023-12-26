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
  pages: ProductType[];
}

export interface CartItem {
  id: string;
  quantity: number;
}

export interface User {
  email: string;
  name: string;
}

export type UserType = {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  roles: string[];
  accessToken: string;
};
