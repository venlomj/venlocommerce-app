import { useState } from "react";
import { toast } from "sonner"; // Import Sonner's toast functionality
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./product-card";
import SkeletonCard from "@/shared/skeleton-card";
import { ProductModal } from "./product-modal";
import { ProductRequest } from "@/types/products/product-request";
import { ProductResponse } from "@/types/products/product-response";
import ProductFilters from "./product-filters";
import PaginationComponent from "@/shared/pagination-component";

export const ProductPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "name",
    sortOrder: "asc",
    page: 1,
    pageSize: 9,
  });

  const { products, isPending, updateProduct, deleteProduct, createProduct } =
    useProducts(filters);
  const items = products?.items ?? [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductResponse | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false); // For new product modal

  const openEditModal = (product: ProductResponse) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedProduct(null); // No product selected for creation
    setIsCreatingProduct(true); // Show create product modal
    setIsModalOpen(true);
  };

  const handleProductSubmit = async (product: ProductRequest) => {
    if (selectedProduct) {
      try {
        await updateProduct.mutateAsync({
          id: selectedProduct.id,
          request: product,
        });
        toast.success("Product updated successfully!"); // Show success toast after update
        setIsModalOpen(false);
      } catch (error) {
        toast.error("Error updating the product.");
        console.error("Error updating the product:", error);
      }
    } else if (isCreatingProduct) {
      try {
        await createProduct.mutateAsync(product); // Create the product here
        toast.success("Product created successfully!"); // Show success toast after creation
        setIsModalOpen(false);
      } catch (error) {
        toast.error("Error creating the product.");
        console.error("Error creating the product:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted successfully!"); // Show success toast after deletion
    } catch (error) {
      toast.error("Error deleting the product.");
      console.error("Error deleting the product:", error);
    }
  };

  const totalPages = Math.ceil((products?.totalCount || 1) / filters.pageSize);

  return (
    <div className="flex flex-col lg:flex-row p-8">
      <div className="w-full lg:w-1/4">
        <ProductFilters
          categories={["Sports", "Electronics", "Clothing"]}
          onFilterChange={(newFilters) =>
            setFilters((prev) => ({
              ...prev,
              ...newFilters,
              page: 1, // Reset naar eerste pagina bij filterwijziging
            }))
          }
        />
      </div>
      <div className="w-full lg:w-3/4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Products</h2>
          <button
            onClick={openCreateModal}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Create Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {isPending
            ? Array.from({ length: 9 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => openEditModal(product)}
                  onDelete={() => handleDelete(product.id)}
                />
              ))}
        </div>

        <PaginationComponent
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProductSubmit}
        product={
          selectedProduct
            ? {
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
                categoryId: selectedProduct.category?.id
                  ? Number(selectedProduct.category.id)
                  : 0, // Standaardwaarde 0 of een geldige fallback
              }
            : undefined
        }
      />
    </div>
  );
};
