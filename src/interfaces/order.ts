import { Brand } from "./brand";

export interface ShippingAddress {
  city: string;
  details: string;
  phone: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderCartItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand: Brand;
  category: { _id: string; name: string; slug: string; image: string };
  subcategory: Subcategory[];
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // هنا id للـ category
}


export interface Order {
  id: string;
  cartItems: OrderCartItem[];
  createdAt: string;
  updatedAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paidAt?: string;
  paymentMethodType: "cash" | "card";
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  user: OrderUser;
}