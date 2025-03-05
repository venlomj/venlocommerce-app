import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import OrdersTable from "./orders-table";
import PaginationComponent from "@/shared/pagination-component";

const OrdersPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "name",
    sortOrder: "asc",
    page: 1, // Initially on the first page
    pageSize: 9, // Number of items per page
  });

  const { orders, isPending } = useOrders(filters);

  const totalPages = Math.ceil((orders?.totalCount || 1) / filters.pageSize);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page, // Update the page number
    }));
  };

  if (isPending) {
    return (
      <div className="p-4 mx-auto max-w-7xl flex justify-center items-center min-h-screen">
        <span className="text-xl text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto max-w-7xl space-y-6">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Order Overview</h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage and review all your recent orders at a glance.
        </p>
      </div>

      {/* Orders Table */}
      {orders && orders.items.length > 0 ? (
        <>
          <OrdersTable orders={orders.items} />
          
          {/* Pagination Component */}
          <PaginationComponent
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center text-xl text-gray-600">No orders found.</div>
      )}
    </div>
  );
};

export default OrdersPage;
