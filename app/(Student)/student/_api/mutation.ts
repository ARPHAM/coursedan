import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "@/config/axios";

export const useCheck = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return axios.get("api/Student/info");
    },
    onSuccess: (res) => {},
    onError: () => {},
  });
};
