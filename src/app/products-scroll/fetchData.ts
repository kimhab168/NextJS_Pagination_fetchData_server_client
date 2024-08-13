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

const fetchData = async (tab: number): Promise<ProductsType> => {
  const limit = 12;
  const skip = tab * limit;
  const url =
    tab === 0
      ? `https://dummyjson.com/products?limit=${limit}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url, {
      cache: "force-cache", // default
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Ensure the response matches the expected structure
    if (!Array.isArray(data.products)) {
      throw new Error("Invalid response structure");
    }

    return { products: data.products };
  } catch (error) {
    // Handle errors, including network issues and parsing errors
    console.error("Failed to fetch data:", error);
    throw error; // Re-throw error to be handled by caller
  }
};

export default fetchData;
