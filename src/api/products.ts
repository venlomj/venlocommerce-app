import { PagedResult } from "@/types/shared/paged-result";
import { Picture } from "@/types/pictures/picture";
import { useQuery } from "@tanstack/react-query";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Picture[];
};

export type GetProductsParams = {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  sortOrder: string;
};

const API_BASE_URL = import.meta.env.VITE_VITE_API_BASE_URL;

// const fetchProducts = async (
//   filters: GetProductsParams
// ): Promise<Product[]> => {
//   const url = new URL(`${API_BASE_URL}/products`);
//   //const url = new URL("http://localhost:5052/api/products");

//   const { searchTerm, category, minPrice, maxPrice, sortBy, sortOrder } =
//     filters;

//   if (searchTerm) url.searchParams.set("searchTerm", searchTerm);
//   if (category) url.searchParams.set("category", category);
//   if (minPrice) url.searchParams.set("minPrice", minPrice.toString());
//   if (maxPrice) url.searchParams.set("maxPrice", maxPrice.toString());
//   if (sortBy) url.searchParams.set("sortBy", sortBy);
//   if (sortOrder) url.searchParams.set("sortOrder", sortOrder);

//   const response = await fetch(url.toString());
//   if (!response.ok) {
//     throw new Error("Error fetching products");
//   }
//   return response.json();
// };

const fetchProducts = async (
  filters: GetProductsParams & { page: number; pageSize: number }
): Promise<PagedResult<Product>> => {
  const url = new URL(`${API_BASE_URL}/products`);
  const {
    searchTerm,
    category,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    page,
    pageSize,
  } = filters;

  if (searchTerm) url.searchParams.set("searchTerm", searchTerm);
  if (category) url.searchParams.set("category", category);
  if (minPrice) url.searchParams.set("minPrice", minPrice.toString());
  if (maxPrice) url.searchParams.set("maxPrice", maxPrice.toString());
  if (sortBy) url.searchParams.set("sortBy", sortBy);
  if (sortOrder) url.searchParams.set("sortOrder", sortOrder);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("pageSize", pageSize.toString());

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  return response.json();
};

export const useGetProducts = (
  filters: GetProductsParams & { page: number; pageSize: number }
) => {
  return useQuery<PagedResult<Product>>({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters), // The filters already include page and pageSize
    staleTime: 300000, // Cache data for 5 minutes
  });
};
