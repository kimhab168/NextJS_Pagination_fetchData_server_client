import Products from "../products/page";

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

const fetchData = async (tab: number): Promise<ProductsType> => {
  const limit = 12;
  const skip = tab == 2 ? limit : (tab - 1) * limit;
  const url =
    tab === 1
      ? `https://dummyjson.com/products?limit=${limit}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url, {
      cache: "no-store", // default
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Ensure the response matches the expected structure
    if (!Array.isArray(data.products)) {
      throw new Error("Invalid response structure");
    }

    return { products: data.products, total: data.total };
  } catch (error) {
    // Handle errors, including network issues and parsing errors
    console.error("Failed to fetch data:", error);
    throw error; // Re-throw error to be handled by caller
  }
};
export const fetchDataAll = async (): Promise<number> => {
  const url = `https://dummyjson.com/products`;

  try {
    const response = await fetch(url, {
      cache: "no-store", // default
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Ensure the response matches the expected structure
    if (!Array.isArray(data.products) || typeof data.total !== "number") {
      throw new Error("Invalid response structure");
    }

    return data.total;
  } catch (error) {
    // Handle errors, including network issues and parsing errors
    console.error("Failed to fetch data:", error);
    throw error; // Re-throw error to be handled by caller
  }
};

export default fetchData;
