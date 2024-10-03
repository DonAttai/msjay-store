import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderType, UserType } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllProducts } from "@/hooks/useProducts";
import { currencyFormatter } from "@/lib/currency-formatter";
import { EXCHANGE_RATE } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { AddressType } from "@/components/add-address-dialog";

type PropType = {
  isOpen: boolean;
  toggleModal: () => void;
  order: OrderType;
};

export default function ViewOrderDialog({
  isOpen,
  toggleModal,
  order,
}: PropType) {
  const { data: products } = useGetAllProducts();

  const { data: userWithAddress } = useQuery({
    queryKey: ["user-with-address"],
    queryFn: async (): Promise<UserType & AddressType> => {
      const res = await axiosInstance.get(`/users/${order?.userId}/address`);
      return res.data;
    },
    enabled: !!order.userId,
  });

  const orderedItems = order.cartItems.map((item) => {
    const cartItems = products?.find(
      (product) => product?._id === item?.productId
    );
    return { ...cartItems, quantity: item?.quantity };
  });

  const orderDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
    hour12: true,
  }).format(new Date(order.createdAt));

  return (
    <Dialog open={isOpen} onOpenChange={() => toggleModal()}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Order Id: {order.transactionId}</DialogTitle>
          <DialogDescription>Ordered Date: {orderDate}</DialogDescription>
        </DialogHeader>
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Item(s)</TableHead>
              <TableHead>Quantities</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderedItems &&
              orderedItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.title}</TableCell>
                  <TableCell>{item?.quantity}</TableCell>
                  <TableCell>
                    {currencyFormatter(item?.price! * item?.quantity)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow className="font-bold">
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>
                {currencyFormatter(Number(order?.totalAmount) / EXCHANGE_RATE)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <section>
          <div>
            <h2>Customer Details</h2>
            <p>
              Name:{" "}
              {`${userWithAddress?.firstName} ${userWithAddress?.lastName}`}
            </p>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
