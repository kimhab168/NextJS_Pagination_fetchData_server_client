"use client"; // If you're using Next.js or a similar framework

import React, { useEffect, useState } from "react";
import ProductComponent from "./product-component";
import fetchData from "./fetchData";
import { Skeleton } from "@nextui-org/skeleton";
import Image from "next/image";
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}

// interface ProductsType {
//   products: Product[];
// }

const Products = () => {
  const [tab, setTab] = useState<number>(0);
  const [Products, setProduct] = useState<Product[] | []>([]);
  useEffect(() => {
    let ignore = true;
    const getData = async () => {
      const { products } = await fetchData(tab);
      if (ignore) {
        setProduct((prev) => [...prev, ...products]);
      }
    };
    getData();
    return () => {
      ignore = false;
    };
  }, [tab]);
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full grid grid-cols-4 place-items-center py-24 gap-y-7">
        {Products.map((item) => (
          <ProductComponent
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            thumbnail={item.thumbnail}
          />
        ))}
      </div>
      <button
        className="text-3xl pb-8"
        onClick={() => setTab((prev) => prev + 1)}
      >
        Load More...
      </button>
    </div>
  );
};

export default Products;
