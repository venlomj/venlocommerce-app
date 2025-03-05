import { FunctionComponent } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the OrderLineItemResponse and OrderResponse types
export interface OrderLineItemResponse {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  orderNumber: string;
  dateCreated: string; // string representation of DateTimeOffset (ISO 8601)
  orderLineItems: OrderLineItemResponse[];
  totalAmount: number;
}

interface OrdersTableProps {
  orders: OrderResponse[];
}

const OrdersTable: FunctionComponent<OrdersTableProps> = ({ orders }) => {
  return (
    <Table className="min-w-full table-auto bg-white shadow-md rounded-lg">
      <TableCaption className="text-xl font-semibold text-gray-700 pb-4">A list of recent orders.</TableCaption>
      <TableHeader className="bg-gray-100 text-left text-sm text-gray-600">
        <TableRow>
          <TableHead className="px-6 py-3">Order Number</TableHead>
          <TableHead className="px-6 py-3">Date Created</TableHead>
          <TableHead className="px-6 py-3">Items</TableHead>
          <TableHead className="px-6 py-3 text-right">Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm text-gray-800">
        {orders.map((order) => (
          <TableRow key={order.orderNumber} className="hover:bg-gray-50 transition-colors">
            <TableCell className="px-6 py-4">{order.orderNumber}</TableCell>
            <TableCell className="px-6 py-4">{new Date(order.dateCreated).toLocaleString()}</TableCell>
            <TableCell className="px-6 py-4">
              {order.orderLineItems.map((item, index) => (
                <div key={index}>
                  {item.quantity} x Product {item.productId} at €{item.price.toFixed(2)}
                </div>
              ))}
            </TableCell>
            <TableCell className="px-6 py-4 text-right font-semibold text-gray-900">
              €{order.totalAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-left text-lg font-medium text-gray-800 px-6 py-3">
            Total
          </TableCell>
          <TableCell className="text-right text-lg font-medium text-gray-900 px-6 py-3">
            €{orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default OrdersTable;
