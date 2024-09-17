import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import OrderConfirmation from "./order-confirmation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SuccessPage() {
  const [searchParams] = useSearchParams({ reference: "" });
  const reference = searchParams.get("reference");

  return (
    <section className="pt-2 min-h-[calc(100vh-128px)] flex flex-col items-center justify-center bg-slate-100">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle> Payment successful!</CardTitle>
          <CardDescription>Your order has been confirmed.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderConfirmation reference={reference as string} />
        </CardContent>
      </Card>
    </section>
  );
}
