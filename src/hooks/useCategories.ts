import agent from "@/services/agent";
import { Category } from "@/types/categories/category";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await agent.get<Category[]>("/categories");
      return response.data; // Ensure correct typing
    },
  });

  return {
    categories,
  };
};
