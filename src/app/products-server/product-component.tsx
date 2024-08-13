"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}
const ProductComponent: React.FC<Product> = ({
  id,
  title,
  description,
  price,
  thumbnail,
}) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col w-72 h-96 bg-slate-500 justify-center items-center"
      onClick={() => router.push(`/products-server/${id}`)}
    >
      <Image src={thumbnail} alt="product" width={288} height={288} />
      <h1 className="p-5">{title}</h1>
    </div>
  );
};

export default ProductComponent;
