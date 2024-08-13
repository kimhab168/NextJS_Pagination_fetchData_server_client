import React, { useEffect, useState } from "react";
import ProductComponent from "./product-component";
import fetchData, { fetchDataAll } from "./fetchData";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}

interface ProductsType {
  products: Product[];
  total: number;
}

const getPagination = (num: number, currentPage: number) => {
  const listPages = [];
  const totalPages = Math.ceil(num / 12);
  for (let i = 1; i <= totalPages; i++) {
    const link = `?page=${i}`;
    listPages.push(
      <li key={i}>
        <Link
          href={link}
          className={i === currentPage ? classActive : classNormal}
        >
          {i}
        </Link>
      </li>
    );
  }
  return listPages;
};

const classNormal =
  "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
const classActive =
  "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";

const Products = async ({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, total } = await fetchData(currentPage);

  const Pages = getPagination(total, currentPage);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full grid grid-cols-4 place-items-center py-24 gap-y-7">
        {products.map((item) => (
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

      <div className="w-full flex justify-center items-center h-12">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li key={"prev"}>
              <Link
                href={`?page=${Math.max(1, currentPage - 1)}`}
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </Link>
            </li>
            {Pages.map((page) => page)}
            <li key={"next"}>
              <Link
                href={`?page=${Math.min(Math.ceil(total / 12), currentPage + 1)}`}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Products;
