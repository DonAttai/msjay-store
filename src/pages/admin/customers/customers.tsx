import { useGetAllCustomers } from "@/hooks/useCustomers";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Customers() {
  const { data: allCustomers, isLoading } = useGetAllCustomers();
  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <div className="text-4xl">Loading...</div>
      ) : (
        <DataTable columns={columns} data={allCustomers!} />
      )}
    </div>
  );
}
