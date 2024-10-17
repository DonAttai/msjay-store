import { useGetOrders } from "@/hooks/useOrder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currencyFormatter } from "@/lib/currency-formatter";
import { EXCHANGE_RATE } from "@/lib/utils";

export function Transactions() {
  const { data: orders, isLoading } = useGetOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent transactions.</CardDescription>
        </div>
        {/* <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden xl:table-column">Type</TableHead>
              <TableHead className="hidden xl:table-column">Status</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders ? (
              <>
                {orders.map((order) => (
                  <TableRow key={order.transactionId}>
                    <TableCell>
                      <div className="font-medium">
                        {order.customer.fullName}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order.customer.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">
                      {currencyFormatter(order.totalAmount / EXCHANGE_RATE)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <div>No Transactions </div>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
