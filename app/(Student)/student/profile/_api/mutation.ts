import { useMutation } from "@tanstack/react-query";
import axios from "@/config/axios";

export type Info = {
  avatar: string | null;
  email: string;
  fullName: string;
  id: string;
  role: string | string[];
};

export const useInfoStudent = () => {
  return useMutation<Info>({
    mutationFn: async () => {
      return await axios.get("/api/Student/info");
    },
  });
};
