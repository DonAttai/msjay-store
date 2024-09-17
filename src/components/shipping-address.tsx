import { useCustomerAddress } from "@/hooks/useAddress";
import { useUser } from "@/stores/user-store";
import { UserType } from "@/types";
import { Button } from "./ui/button";

export function ShippingAddress() {
  const user = useUser() as UserType;
  const { data: address, isLoading: isAddressLoading } = useCustomerAddress(
    user._id
  );

  if (isAddressLoading) {
    <p>Loading...</p>;
  }
  return (
    <div className="mt-8">
      {address && (
        <>
          <h2 className="text-2xl font-bold">Shipping Address</h2>
          <p>Address: {address.address}</p>
          <p>Street: {address.street}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <p>Email: {user.email}</p>
          <p className="flex justify-between items-center">
            Phone: {address.phone}
            <Button variant="ghost">Update Address</Button>
          </p>
        </>
      )}
    </div>
  );
}
