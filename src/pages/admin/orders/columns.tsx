import { Button } from "@/components/ui/button";
import { OrderType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import DatatableRowActions from "./data-table-row-actions";
import { EXCHANGE_RATE, formatNumber } from "@/lib/utils";

export const columns: ColumnDef<OrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "transactionId",
    header: "Order Id",
  },
  {
    accessorKey: "totalAmount",
    header: () => <div>Amount (Naira)</div>,
    cell: ({ row }) => {
      const totalAmount: number = row.getValue("totalAmount");
      return <div>{formatNumber(totalAmount / EXCHANGE_RATE)}</div>;
    },
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      const formattedDate = date.split("T")[0];
      const formattedTime = date.split("T")[1].split(".")[0];
      return (
        <div>
          <p>{formattedDate}</p>
          <p className="text-muted-foreground">{formattedTime}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <DatatableRowActions row={row} />;
    },
  },
];
