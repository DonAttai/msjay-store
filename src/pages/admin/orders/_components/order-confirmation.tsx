import { useCurrentOrder } from "@/hooks/useOrder";
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
import { useCustomerAddress } from "@/hooks/useAddress";
import { useUser } from "@/stores/user-store";
import { EXCHANGE_RATE } from "@/lib/utils";

export default function OrderConfirmation({
  reference,
}: {
  reference: string;
}) {
  const {
    data: order,
    isLoading,
    isSuccess,
  } = useCurrentOrder(reference as string);

  const { data: products } = useGetAllProducts();

  // get customer address
  const { data: address } = useCustomerAddress(order?.userId as string);

  // get user
  const user = useUser();

  const orderedItems = order?.cartItems.map((cartItem) => {
    const item = products?.find(
      (product) => product._id === cartItem.productId
    );
    return { ...item, quantity: cartItem.quantity };
  });

  if (isLoading) {
    return <div className="min-h-[calc(100vh-128px)] text-4xl">Loading...</div>;
  }
  return (
    <section>
      {isSuccess ? (
        <div>
          <div className="mb-4">
            <p>
              <span className="font-bold">Order Id: </span>
              {order.transactionId}
            </p>
            <p>
              <span className="font-bold">Payment Status: </span>
              {order.paymentStatus}
            </p>
            <p>
              <span className="font-bold">Order Status: </span>
              {order.orderStatus}
            </p>
          </div>
          <p className="mt-2 font-bold underline text-center">CART ITEMS</p>
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
                orderedItems.map((item) => (
                  <TableRow key={item?._id}>
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
                  {currencyFormatter(
                    Number(order?.totalAmount) / EXCHANGE_RATE
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <section>
            <div className="mb-2">
              <h2 className="text-lg font-bold">Customer Details</h2>
              <p>Name: {`${user?.firstName} ${user?.lastName}`}</p>
              <p>Email: {user?.email}</p>
              <p>Phone: {address?.phone}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-lg font-bold">Shipping Address</h2>
              <p>Address: {address?.address}</p>
              <p>Street: {address?.street}</p>
              <p>City: {address?.city}</p>
              <p>State: {address?.state}</p>
            </div>
          </section>
        </div>
      ) : (
        <div>No oders available</div>
      )}
    </section>
  );
}
