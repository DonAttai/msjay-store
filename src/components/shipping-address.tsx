import { useCustomerAddress } from "@/hooks/useAddress";
import { useUser } from "@/stores/user-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useReducer } from "react";
import { UpdateAddressDialog } from "./update-address-dialog";

export function ShippingAddress() {
  const [isModalOpen, toggleModal] = useReducer((prev) => !prev, false);
  const user = useUser();
  const { data: address, isLoading: isAddressLoading } = useCustomerAddress(
    user?._id as string
  );

  if (isAddressLoading) {
    <p>Loading address...</p>;
  }
  return (
    <Card className="max-w-[425px] w-fit">
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>
          Item(s) will be shipped to this address
        </CardDescription>
      </CardHeader>
      <CardContent>
        {address && (
          <>
            <p>Address: {address?.address}</p>
            <p>Street: {address?.street}</p>
            <p>City: {address?.city}</p>
            <p>State: {address?.state}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {address?.phone}</p>
            <div className="text-right">
              <UpdateAddressDialog
                isOpen={isModalOpen}
                toggleModal={toggleModal}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
