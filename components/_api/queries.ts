import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import axios from "@/config/axios";

type ListCategory = {
  id: number;
  name: string;
}[];

export const useListCategory = () => {
  return useQuery<ListCategory>({
    queryKey: ["ListCategory"],
    queryFn: async () => {
      const res = await axios.get("/api/public/courses-category");
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
