export interface ICategory {
  _id: string;
  name: string;
  products?: IProduct[];
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  categories: ICategory[];
}

export interface IProductsResponse {
  message: string;
  products: IProduct[];
}

export interface IProductResponse {
  message: string;
  product: IProduct;
}

export interface ILoginOrRegistrationResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IRegistrationData {
  username: string;
  name: string;
  email: string;
  password: string;
  image: string;
  address: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  image: string;
  address: string;
  role: string;
}

export interface IAuthStorage {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: IUser | null;
}

export interface IOrderItem extends IProduct {
  quantity: number;
}

export interface IOrder {
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalPrice: number;
  items: IOrderItem[];
  user: IUser;
}

export interface IOrderResponse {
  message: string;
  order: IOrder;
}
