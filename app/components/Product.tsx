import Image from "next/image";
import React from "react";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

const Product = ({ name, image, price, id }: ProductType) => {
  return (
    <Link
      href={{ pathname: `/product/${id}`, query: { name, image, price, id } }}
    >
      <div className="">
        <Image
          src={image}
          width={800}
          height={800}
          alt={name}
          priority={true}
          className="w-96 object-cover rounded-lg shadow-lg"
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-bold text-teal-700">
            {" "}
            {price / 100 + " $"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
