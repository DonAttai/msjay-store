import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { nigerianStates } from "@/lib/utils";
import {
  useCustomerAddress,
  useUpdateCustomerAddress,
} from "@/hooks/useAddress";
import { useEffect } from "react";
import { PenBox } from "lucide-react";
import { useUser } from "@/stores/user-store";

export const formSchema = z.object({
  address: z.string().min(2, {
    message: "Address is required.",
  }),
  street: z.string().min(2, {
    message: "Street is required.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  phone: z.string().length(11, {
    message: "Phone number is required.",
  }),
});

export type AddressType = z.infer<typeof formSchema>;
type AddressPropsType = {
  isOpen: boolean;
  toggleModal: () => void;
};

export function UpdateAddressDialog({ isOpen, toggleModal }: AddressPropsType) {
  const user = useUser();
  const { data: address } = useCustomerAddress(user?._id as string);
  const {
    mutate: updateAddress,
    isLoading,
    isSuccess,
  } = useUpdateCustomerAddress(user?._id as string);

  const form = useForm<AddressType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: address?.address || "",
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      phone: address?.phone || "",
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toggleModal();
      form.reset();
    }
  }, [isSuccess, toggleModal, form]);

  const onSubmit = async (values: AddressType) => {
    updateAddress(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => toggleModal()}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-2 mt-2 font-bold text-lg text-right"
        >
          <PenBox />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Shipping Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input id="city" placeholder="city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className=" text-white w-full bg-green-400 hover:bg-green-600 text-lg font-bold disabled:opacity-50"
            >
              {isLoading ? "Wait..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
