"use client"; // If you're using Next.js or a similar framework

import React, { useEffect, useState } from "react";
import ProductComponent from "./product-component";
import fetchData from "./fetchData";
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}

interface ProductsType {
  products: Product[];
}

const Products = () => {
  const [tab, setTab] = useState<number>(0);
  const [Products, setProduct] = useState<Product[] | []>([]);
  useEffect(() => {
    let ignore = true;
    const getData = async () => {
      const { products } = await fetchData(tab);
      if (ignore) {
        setProduct([...products]);
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
      <div className="w-full flex justify-center items-center h-12 text-red-500">
        <button
          className="text-3xl pb-8 p-4 border-red-200 border"
          onClick={() => setTab(0)}
        >
          1
        </button>
        <button
          className="text-3xl pb-8 p-4 border-red-200 border"
          onClick={() => setTab(1)}
        >
          2
        </button>
        <button
          className="text-3xl pb-8 p-4 border-red-200 border"
          onClick={() => setTab(2)}
        >
          3
        </button>
        <button
          className="text-3xl pb-8 p-4 border-red-200 border"
          onClick={() => setTab(3)}
        >
          4
        </button>
      </div>
    </div>
  );
};

export default Products;
