import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ICategory, IProduct } from "../interfaces";
import { scaleDown } from "../utils/motion";

interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className="card bg-base-100 w-full shadow">
      <div className="overflow-hidden">
        <motion.figure
          initial="hidden"
          whileInView="visible"
          variants={scaleDown()}
          className="w-full h-96"
        >
          <Image
            src={product.image as string}
            alt={product.name}
            width={1280}
            height={720}
            priority
            className="w-full h-full object-cover"
          />
        </motion.figure>
      </div>
      <div className="card-body">
        <div className="flex items-center gap-2 flex-wrap">
          {product.categories.map((category: ICategory) => (
            <div
              key={category._id}
              className="badge badge-primary badge-outline uppercase whitespace-nowrap"
            >
              {category.name}
            </div>
          ))}
        </div>
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description.substring(0, 100)}...</p>
        <div className="card-actions justify-between items-center">
          <h2 className="card-title">${product.price}</h2>
          <Link href={`/products/${product._id}`} className="btn btn-primary">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
