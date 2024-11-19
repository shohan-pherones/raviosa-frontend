import { ICategory } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface CategoryProps {
  category: ICategory;
}

const categoryImages = new Map([
  ["Tops", "/images/tops.jpeg"],
  ["Bottoms", "/images/bottoms.jpeg"],
  ["Pants", "/images/pants.jpeg"],
  ["Shirts", "/images/shirts.jpeg"],
  ["Blouses", "/images/blouses.jpeg"],
]);

const Category = ({ category }: CategoryProps) => {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="card bg-base-100 image-full w-full h-48 shadow cursor-pointer"
    >
      <figure>
        <Image
          src={
            categoryImages.get(category.name) ||
            "/images/product-placeholder.svg"
          }
          alt={category.name}
          width={1280}
          height={720}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body flex items-center justify-center">
        <h2 className="card-title">{category.name}</h2>
      </div>
    </Link>
  );
};

export default Category;
