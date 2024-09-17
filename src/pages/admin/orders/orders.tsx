import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetOrders } from "@/hooks/useOrder";

export default function Orders() {
  // get all orders
  const { data: orders, isLoading } = useGetOrders();

  return (
    <div className="container mx-auto pt-10 pb-10">
      {isLoading ? (
        <div className="text-4xl">Loading...</div>
      ) : (
        <DataTable columns={columns} data={orders!} />
      )}
    </div>
  );
}
