import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUpdateOrder } from "@/hooks/useOrder";
import { useEffect } from "react";
import toast from "react-hot-toast";

type PropType = {
  isOpen: boolean;
  toggleModal: () => void;
  order: OrderType;
};

const updateOrderSchema = z.object({
  orderStatus: z.string(),
});

const orderStatus: string[] = ["PROCESSING", "SHIPPED", "DELIVERED"];

export default function UpdateOrderDialog({
  isOpen,
  toggleModal,
  order,
}: PropType) {
  const {
    data: payload,
    isLoading,
    mutate: updateOrder,
    isSuccess,
  } = useUpdateOrder(order?.transactionId);

  const form = useForm<z.infer<typeof updateOrderSchema>>({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: {
      orderStatus: order.orderStatus,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toggleModal();
      toast.success(payload.message);
    }
  }, [toggleModal, isSuccess]);

  const onSubmit = async (values: z.infer<typeof updateOrderSchema>) => {
    updateOrder(values);
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => toggleModal()}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="orderStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orderStatus.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className=" text-white w-full bg-green-400 hover:bg-green-600 text-lg font-bold disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Order"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
