import { currencyFormatter } from "@/lib/currency-formatter";
import { EXCHANGE_RATE } from "@/lib/utils";
import { OrderType, UserType } from "@/types";

export function totalRevenue(orders: OrderType[]) {
  const total = orders.reduce(
    (total, order) => total + Number(order.totalAmount),
    0
  );
  return currencyFormatter(total / EXCHANGE_RATE);
}

export function totalSales(order: OrderType[]) {
  return order.filter((order) => order.paymentStatus === "PAID")?.length || 0;
}

export function activeUsers(users: UserType[]) {
  return users.filter((user) => user.isVerified === true)?.length || 0;
}
