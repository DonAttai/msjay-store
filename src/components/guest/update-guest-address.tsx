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
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { nigerianStates } from "@/lib/utils";
import { PenBox } from "lucide-react";
import { useGuestActions, useGuestAddress } from "@/stores/guest-user-store";

export const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name is required.",
  }),
  email: z.string().email(),
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

type AddressType = z.infer<typeof formSchema>;
type AddressPropsType = {
  isOpen: boolean;
  toggleModal: () => void;
};

export function UpdateGuestAddress({ isOpen, toggleModal }: AddressPropsType) {
  const { setGuestAddress } = useGuestActions();
  const guestAddress = useGuestAddress();

  const form = useForm<AddressType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: guestAddress?.fullName || "",
      email: guestAddress?.email || "",
      address: guestAddress?.address || "",
      street: guestAddress?.street || "",
      city: guestAddress?.city || "",
      state: guestAddress?.state || "",
      phone: guestAddress?.phone || "",
    },
  });

  const onSubmit = async (values: AddressType) => {
    setGuestAddress(values);
    toggleModal();
    form.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        toggleModal();
      }}
    >
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" id="address" {...field} />
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
                  <FormLabel htmlFor="street">Street</FormLabel>
                  <FormControl>
                    <Input placeholder="street" {...field} id="street" />
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
                      <FormLabel htmlFor="city">City</FormLabel>
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
                    <FormLabel htmlFor="state">State</FormLabel>
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
                          <SelectItem id="state" key={state} value={state}>
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
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      type="number"
                      id="phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" text-white w-full bg-green-400 hover:bg-green-600 text-lg font-bold disabled:opacity-50"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
