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

export interface IError {
  message: string;
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
