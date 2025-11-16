import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import axios from "@/config/axios";

import { toast } from "@/components/ui/use-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return axios.post(`/api/Student/${id}/checkout`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["ListMyCourses"] });
      toast({ description: "Buy Course successfully!" });
    },
    onError: (e: any) => {
      if (e.response?.data?.message)
        toast({ description: e.response.data.message, variant: "destructive" });
    },
  });
};
