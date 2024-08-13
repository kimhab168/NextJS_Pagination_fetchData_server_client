interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}
const fetchData = async (id: string): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  // console.log(data);
  return data;
};
export default fetchData;
