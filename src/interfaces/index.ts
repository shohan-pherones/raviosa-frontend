export interface ICategory {
  name: string;
  products?: IProduct[];
}

export interface IProduct {
  name: string;
  description: string;
  images?: string[];
  price: number;
  stock: number;
  categories: ICategory[];
}

export interface IError {
  message: string;
}
