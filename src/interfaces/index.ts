export interface ICategory {
  _id?: string;
  name?: string;
  products?: IProduct[];
}

export interface ICategoryResponse {
  message: string;
  category: ICategory;
}

export interface ICategoriesResponse {
  message: string;
  categories: ICategory[];
}

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  image: string | File;
  price: number;
  stock: number;
  categories: ICategory[];
  orders?: IOrder[];
  createdAt?: string;
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
  image: string | File;
  address: string;
}

export interface IUpdateUserData {
  username: string;
  name: string;
  image: string | File;
  address: string;
}

export interface IShippingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
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
  orders?: IOrder[];
  createdAt?: Date;
}

export interface IUsersResponse {
  message: string;
  users: IUser[];
}

export interface IUserResponse {
  message: string;
  user: IUser;
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
  _id?: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalPrice: number;
  items: IOrderItem[];
  user: IUser;
  status?:
    | "placed"
    | "confirmed"
    | "paid"
    | "processing"
    | "shipping"
    | "shipped"
    | "cancelled";
  shippingDetails?: IShippingData;
  createdAt?: Date;
}

export interface IOrderResponse {
  message: string;
  order: IOrder;
}

export interface IOrdersResponse {
  message: string;
  orders: IOrder[];
}

export interface IConfirmOrderData {
  shippingDetails: IShippingData;
  items: IOrderItem[];
  orderId: string;
}

export interface IMutateOrderStatusData {
  orderId: string;
  status: string;
}

export interface IOrderDetailsResponse {
  message: string;
  orderedItems: {
    orderCosts: {
      subtotal: number;
      shippingCost: number;
      tax: number;
      totalPrice: number;
    };
    items: {
      product: IProduct;
      quantity: number;
    }[];
  };
}
