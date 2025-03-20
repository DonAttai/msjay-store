import { useNavigate, useSearchParams } from "react-router-dom";
import OrderConfirmation from "./order-confirmation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGuestActions, useGuestAddress } from "@/stores/guest-user-store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const [searchParams] = useSearchParams({ reference: "" });
  const reference = searchParams.get("reference");
  const guestAddress = useGuestAddress();
  const { setGuestAddress } = useGuestActions();
  const navigate = useNavigate();
  useEffect(() => {
    if (guestAddress) {
      setGuestAddress(null);
    }
  }, [guestAddress, setGuestAddress]);

  return (
    <section className="pt-2 min-h-[calc(100vh-128px)] grid place-content-center bg-slate-100">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle> Payment successful!</CardTitle>
          <CardDescription>Your order has been confirmed.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderConfirmation reference={reference as string} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => navigate("/store")}
            className=" w-24 bg-green-600 text-lg font-bold hover:bg-green-700"
          >
            Ok
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
