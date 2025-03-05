import { useQuery } from "@tanstack/react-query";
import agent from "@/services/agent";
import { ProductsParams } from "@/types/products/product-params";
import { PagedResult } from "@/types/shared/paged-result";
import { OrderResponse } from "@/pages/orders/orders-table";

export const useOrders = (params: ProductsParams) => {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const response = await agent.get<PagedResult<OrderResponse>>("/orders", {
        params,
      });
      return response.data;
    },
    placeholderData: (prev) => prev,
  });

  return {
    orders,
    isPending,
  };
};
