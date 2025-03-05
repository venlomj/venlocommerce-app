import { PagedResult } from "@/types/shared/paged-result";
import { Product } from "@/types/products/product";
import { Result } from "@/types/shared/result";

export const fetchProducts = async (query: string): Promise<Product[]> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
  if (!query.trim()) {
    throw new Error("Invalid search query");
  }

  const url = new URL(`${baseUrl}/products`);
  url.searchParams.set("q", query);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Error fetching products");

    const result: Result<PagedResult<Product>> = await response.json();
    return result.data.items; // Return the list of products
  } catch (error) {
    console.error(error);
    return [];
  }
};
