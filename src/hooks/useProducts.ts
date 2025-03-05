import agent from "@/services/agent";
import { ProductsParams } from "@/types/products/product-params";
import { ProductRequest } from "@/types/products/product-request";
import { ProductResponse } from "@/types/products/product-response";
import { PagedResult } from "@/types/shared/paged-result";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = (params: ProductsParams) => {
  const queryClient = useQueryClient();

  const { data: products, isPending } = useQuery({
    queryKey: ["products", params], // Ensure refetching on param change
    queryFn: async () => {
      const response = await agent.get<PagedResult<ProductResponse>>(
        "/products",
        { params }
      );
      return response.data;
    },
    placeholderData: (prev) => prev, // Keeps previous data while fetching new results
  });

  const createProduct = useMutation({
    mutationFn: async (request: ProductRequest) => {
      await agent.post("/products", request);
    },
    // On success, invalidate the 'products' query to refetch the data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({
      id,
      request,
    }: {
      id: string;
      request: ProductRequest;
    }) => {
      await agent.put(`/products/${id}`, request);
    },
    // On success, invalidate the 'products' query to refetch the data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/products/${id}`);
    },
    // On success, invalidate the 'products' query to refetch the data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    isPending,
  };
};
