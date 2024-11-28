import { IProduct } from "../interfaces";
import Product from "./Product";
import SectionTitle from "./SectionTitle";

interface ProductsProps {
  products: IProduct[];
  isBestSelling?: boolean;
  isNewArrivals?: boolean;
  categoryName?: string;
}

const Products = ({
  products,
  isBestSelling,
  isNewArrivals,
  categoryName,
}: ProductsProps) => {
  return (
    <section className="wrapper min-h-screen">
      <SectionTitle
        title={
          categoryName
            ? categoryName
            : isBestSelling
            ? "Best Selling Products"
            : isNewArrivals
            ? "New Arrivals"
            : "Browse All Products"
        }
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
