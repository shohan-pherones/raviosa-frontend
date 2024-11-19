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

export interface ICategoriesResponse {
  message: string;
  categories: ICategory[];
}

export interface IError {
  message: string;
}
