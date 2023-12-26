import axiosInstance from "./axios";
import { useInfiniteQuery } from "@tanstack/react-query";

// export const useProducts = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: () =>
//       axiosInstance()
//         .get<IProduct>(`/products`)
//         .then((res) => res.data),
//   });
// };

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) =>
      axiosInstance()
        .get(`/products?size=8&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage.products.length ? nextPage : undefined;
    },
  });
};
