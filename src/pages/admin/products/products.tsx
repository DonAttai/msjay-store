import { useReducer } from "react";
import { CreateProductDialog } from "./_components/create-product-dialog";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetAllProducts } from "@/hooks/useProducts";

export default function Products() {
  const [isCreateProductDialogOpen, toggleDialog] = useReducer(
    (prev) => !prev,
    false
  );

  const { data: products, isLoading } = useGetAllProducts();

  return (
    <>
      <div className="container mx-auto pt-10 sm:text-right">
        <CreateProductDialog
          isOpen={isCreateProductDialogOpen}
          toggleDialog={toggleDialog}
        />
      </div>
      <div className="container mx-auto pb-10">
        {isLoading ? (
          <div className="text-4xl">Loading...</div>
        ) : (
          <DataTable columns={columns} data={products!} />
        )}
      </div>
    </>
  );
}
