import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";

export type Info = {
  avatar: string | null;
  email: string;
  fullName: string;
  id: string;
  role: string | string[];
};

export const useInfoStudent = () => {
  return useQuery<Info>({
    queryKey: ["InfoStudent"],
    queryFn: async () => {
      return await axios.get("/api/Student/info");
    },
    placeholderData: keepPreviousData,
  });
};
