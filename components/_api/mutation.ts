import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import axios from "@/config/axios";

import { toast } from "@/components/ui/use-toast";

import { GroupDto } from "./validations";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GroupDto) => {
      return axios.post("/admin/group", {
        ...data,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["useGroups"] });
      toast({ description: "Group created successfully!" });
    },
    onError: (e: any) => {
      if (e.response?.data?.message)
        toast({ description: e.response.data.message, variant: "destructive" });
    },
  });
};
