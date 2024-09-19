import { useReducer } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { ProductType } from "@/types";
import { UpdateProductDialog } from "./_components/update-product-dialog";

interface DataTableRowActionProps<TData> {
  row: Row<TData>;
}

export default function DatatableRowActions({
  row,
}: DataTableRowActionProps<ProductType>) {
  const product = row.original;
  const [isUpdateModalOpen, toggleUpdateModal] = useReducer(
    (prev) => !prev,
    false
  );
  // const [isDeleteModalOpen, toggleDeleteModal] = useReducer(
  //   (prev) => !prev,
  //   false
  // );
  // const [isViewModalOpen, toggleViewModal] = useReducer((prev) => !prev, false);

  return (
    <>
      <UpdateProductDialog
        isOpen={isUpdateModalOpen}
        toggleModal={toggleUpdateModal}
        product={product}
      />

      {/* <DeleteProductDialog
        isOpen={isDeleteModalOpen}
        toggleModal={toggleDeleteModal}
        customer={customer}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <button onClick={toggleUpdateModal}>Update</button>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <button onClick={toggleDeleteModal}>Delete</button>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            <button onClick={toggleViewModal}>View</button>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
