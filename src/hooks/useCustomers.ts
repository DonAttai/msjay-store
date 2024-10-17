import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });
};
