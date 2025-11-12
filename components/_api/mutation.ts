import { useMutation } from "@tanstack/react-query";

import axios from "@/config/axios";

type ListCategory = {
  id: number;
  name: string;
}[];

export const useListCategory = () => {
  return useMutation({
    mutationFn: async () => {
      const { data }: { data: ListCategory } = await axios.get(
        "/api/public/courses-category"
      );
      return data;
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
