import { currencyFormatter } from "@/lib/currency-formatter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCalculateTotalPrice,
  useCart,
  useCartQuantity,
} from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { ProductType } from "@/types";
import { PayWithPaystack } from "./paystack";

export function CartSummary({ isAddress }: { isAddress: boolean }) {
  const totalPrice = useCalculateTotalPrice() as number;
  const { data: cart } = useCart();
  const { data } = useProducts();

  // get cart  quantity
  const cartQuantity = useCartQuantity();

  // get items in cart
  const cartItems = cart?.products.map((item) => {
    const cartItems = data?.products.find(
      (product) => product?._id === item.productId
    );
    return { ...(cartItems as ProductType), quantity: item.quantity };
  });

  // get cart quantity

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Cart Details</CardTitle>
        <hr />
      </CardHeader>
      <CardContent>
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Item(s)</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>
                {cartQuantity! > 1 ? "Quantities" : "Quantity"}
              </TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems &&
              cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.title}</TableCell>
                  <TableCell>
                    <img src={item?.image} height="48px" width="48px" />
                  </TableCell>
                  <TableCell>{item?.quantity}</TableCell>
                  <TableCell>
                    {currencyFormatter(item?.price! * item?.quantity)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow className="font-bold">
              <TableCell colSpan={3}>Total Amount</TableCell>
              <TableCell>{currencyFormatter(totalPrice as number)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>

      <CardFooter>{isAddress && <PayWithPaystack />}</CardFooter>
    </Card>
  );
}
