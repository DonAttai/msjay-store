export type ProductType = {
  _id?: string;
  price: number;
  image: string;
  title: string;
  category: string;
  description: string;
  stock?: number;
};
export interface IProduct {
  page: string;
  size: string;
  products: ProductType[];
}
export interface CartItem {
  productId: string;
  quantity: number;
}
export interface Cart {
  _id: string;
  userId: string;
  products: CartItem[];
}

export interface User {
  email: string;
  name: string;
}

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isVerified: boolean;
  role: string;
  accessToken: string;
};
export type AddressType = {
  address: string;
  street: string;
  city: string;
  state: string;
  phone: string;
};
export type OrderType = {
  customerId: string;
  customer: {
    email: string;
    fullName: string;
  };
  transactionId: string;
  cartItems: CartItem[];
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  addressInfo: AddressType;
  createdAt: Date;
};
