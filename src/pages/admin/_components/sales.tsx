import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetOrders } from "@/hooks/useOrder";
import { currencyFormatter } from "@/lib/currency-formatter";
import { EXCHANGE_RATE } from "@/lib/utils";

function getInitials(fullName: string) {
  const names = fullName.split(" ").slice(0, 2);
  const initials = names
    .map((name) => name.trim().charAt(0).toUpperCase())
    .join("");
  return initials;
}

export function Sales() {
  const { data: orders } = useGetOrders();
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {orders ? (
          <>
            {orders.map((order) => (
              <div
                key={order.transactionId}
                className="flex items-center gap-4"
              >
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                    {getInitials(order.customer.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {order.customer.fullName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {currencyFormatter(order.totalAmount / EXCHANGE_RATE)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No Sales</div>
        )}
      </CardContent>
    </Card>
  );
}
