import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import axios from "@/config/axios";

export const useCheck = () => {
  return useQuery({
    queryKey: ["Check"],
    queryFn: async () => {
      return axios.get("api/Student/info");
    },
    placeholderData: keepPreviousData,
  });
};
