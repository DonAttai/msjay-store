import { useUser } from "@/stores/user-store";
import { Activity, CreditCard, Users } from "lucide-react";

import { Navigate } from "react-router-dom";
import { Role } from "@/lib/utils";
import DashboardCard from "./_components/dashboard-card";
import { Transactions } from "./_components/transactions";
import { Sales } from "./_components/sales";
import { activeUsers, totalRevenue, totalSales } from "./utils/calculations";
import { useGetOrders } from "@/hooks/useOrder";
import { useGetAllCustomers } from "@/hooks/useCustomers";

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.";

export default function AdminDashboard() {
  const user = useUser();
  const { data: orders } = useGetOrders();
  const { data: customers } = useGetAllCustomers();
  const totalAmount = orders && totalRevenue(orders!);
  const allSales = orders && totalSales(orders!);
  const activeCustomers = customers && activeUsers(customers!);

  if (!user || user?.role !== Role.ADMIN) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* Total revenue */}
          <DashboardCard title="Total Revenue" icon={<NairaSign />}>
            <div className="text-2xl font-bold">{totalAmount}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </DashboardCard>

          {/* subscriptions */}
          <DashboardCard
            title="Subscriptions"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          >
            <div className="text-2xl font-bold">+{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </DashboardCard>

          {/* Sales */}
          <DashboardCard
            title="Sales"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          >
            <div className="text-2xl font-bold">+{allSales}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </DashboardCard>

          {/* Active customers */}
          <DashboardCard
            title="Active Now"
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          >
            <div className="text-2xl font-bold">+2</div>
            <p className="text-xs text-muted-foreground">+1 since last hour</p>
          </DashboardCard>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Transactions />
          <Sales />
        </div>
      </main>
    </div>
  );
}

function NairaSign() {
  return <span className="h-4 w-4 text-muted-foreground">₦</span>;
}
