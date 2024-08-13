"use client";
import React, { useEffect, useState } from "react";
import fetchData from "./fetchData";
import Image from "next/image";
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}
const PostDetail = ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  const [dataDetail, setDataDetail] = useState<Product>({
    id: "",
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });
  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchData(params.productId);
        setDataDetail(data);
      } catch (error) {}
    };
    loadDetail();
  }, [params.productId]);

  return (
    <div className="w-full h-full pt-20 flex flex-col justify-center items-center">
      <h1>Post Detail</h1>
      <h1>ID: {dataDetail?.id}</h1>
      <h1>Title{dataDetail?.title}</h1>
      {dataDetail ? (
        <Image src={dataDetail.thumbnail} width={400} height={400} alt="" />
      ) : (
        ""
      )}
    </div>
  );
};

export default PostDetail;
