import axiosInstance from "@/lib/axios";
import { OrderType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// sort orders by date

const sortedOrders = (orders: OrderType[]) => {
  return orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// get all orders - admin only
export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders", "get-all-orders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/orders");
      return sortedOrders(res.data);
    },
  });
};

export const useCurrentOrder = (transactionId: string) => {
  return useQuery({
    queryKey: ["orders", "get-single-order", transactionId],
    queryFn: async (): Promise<OrderType> => {
      const res = await axiosInstance.get(`/orders/${transactionId}`);
      return res.data;
    },
    enabled: !!transactionId,
  });
};

export const useUpdateOrder = (transactionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: { orderStatus: string }) => {
      const res = await axiosInstance.patch(`/orders/${transactionId}`, values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
