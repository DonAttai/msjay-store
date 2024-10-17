import { useReducer } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useGuestAddress } from "@/stores/guest-user-store";
import { UpdateGuestAddress } from "./update-guest-address";

export function GuestShippingAddress() {
  const [isUpdateAddressOpen, toggle] = useReducer((prev) => !prev, false);
  const guestAddress = useGuestAddress();

  return (
    <Card className="max-w-[425px] w-fit">
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>
          Item(s) will be shipped to this address
        </CardDescription>
      </CardHeader>
      <CardContent>
        {guestAddress && (
          <>
            <p>Address: {guestAddress?.address}</p>
            <p>Street: {guestAddress?.street}</p>
            <p>City: {guestAddress?.city}</p>
            <p>State: {guestAddress?.state}</p>
            <p>Email: {guestAddress?.email}</p>
            <p>Phone: {guestAddress?.phone}</p>
            <div className="text-right">
              <UpdateGuestAddress
                isOpen={isUpdateAddressOpen}
                toggleModal={toggle}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
