import { IProduct } from "@/interfaces";
import Product from "./Product";
import SectionTitle from "./SectionTitle";

interface ProductsProps {
  products: IProduct[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <section className="wrapper min-h-screen">
      <SectionTitle title="Products" />
      <div className="grid-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
