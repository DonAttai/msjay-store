import React, { useReducer } from "react";

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
// import UpdateTransactionDialog from "./_components/update-transaction-dialog";
// import { DeleteTransactionDailog } from "./_components/delete-transaction-dialog";
import { UserType } from "@/types";

interface DataTableRowActionProps<TData> {
  row: Row<TData>;
}

export default function DatatableRowActions({
  row,
}: DataTableRowActionProps<UserType>) {
  const customer = row.original;
  const [isUpdateModalOpen, toggleUpdateModal] = useReducer(
    (prev) => !prev,
    false
  );
  const [isDeleteModalOpen, toggleDeleteModal] = useReducer(
    (prev) => !prev,
    false
  );
  const [isViewModalOpen, toggleViewModal] = useReducer((prev) => !prev, false);

  return (
    <>
      {/* <UpdateTransactionDialog
        isOpen={isUpdateModalOpen}
        toggleModal={toggleUpdateModal}
        customer={customer}
      />

      <DeleteTransactionDailog
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
          <DropdownMenuItem>
            <button onClick={toggleDeleteModal}>Delete</button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={toggleViewModal}>View</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
