import { useMutation } from "@tanstack/react-query";

import axios from "@/config/axios";

type ListCategory = {
  id: number;
  name: string;
}[];

export const useListCategory = () => {
  return useMutation<ListCategory>({
    mutationFn: async () => {
      const res = await axios.get("/api/public/courses-category");
      return res.data;
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
