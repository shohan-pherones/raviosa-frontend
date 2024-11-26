import { IProduct } from "../interfaces";
import Product from "./Product";
import SectionTitle from "./SectionTitle";

interface ProductsProps {
  products: IProduct[];
  isBestSelling?: boolean;
}

const Products = ({ products, isBestSelling }: ProductsProps) => {
  return (
    <section className="wrapper min-h-screen">
      <SectionTitle
        title={isBestSelling ? "Best Selling Products" : "Browse All Products"}
      />
      <div className="grid-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
