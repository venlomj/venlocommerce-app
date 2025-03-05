export type ProductsParams = {
  searchTerm?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: string;
  page: number;
  pageSize: number;
};
