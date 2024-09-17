import axiosInstance from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCustomerAddress = (userId: string) => {
  return useQuery({
    queryKey: ["customer-address", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/address/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });
};

export const useAddCustomerAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (address: any) => {
      const res = await axiosInstance.post("/address", address);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-address"] });
    },
  });
};
