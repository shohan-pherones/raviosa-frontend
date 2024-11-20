export interface ICategory {
  _id: string;
  name: string;
  products?: IProduct[];
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images?: string[];
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

export interface IUserResponse {
  message: string;
  user: IUser;
}

export interface IAuthStorage {
  accessToken: string;
  user: IUser | null;
}
