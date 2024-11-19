import { IProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className="card bg-base-100 w-full shadow">
      <figure className="w-full h-96">
        <Image
          src={product?.images?.at(0) || "/images/product-placeholder.svg"}
          alt={product.name}
          width={1280}
          height={720}
          priority
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-2">
          {product.categories.map((category) => (
            <div
              key={category._id}
              className="badge badge-primary badge-outline uppercase"
            >
              {category.name}
            </div>
          ))}
        </div>
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
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