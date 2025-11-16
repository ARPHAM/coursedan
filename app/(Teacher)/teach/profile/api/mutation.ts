"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/config/axios";
import { toast } from "@/components/ui/use-toast";

export type UpdateProfileDto = {
  title: string;
  bio: string;
  experience: string;
  certificateUrl: string;
  portfolioUrl: string;
};

type UpdateProfileResponse = {
  message: string;
  profile: any;
};

export const useUpdateInstructorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileDto) => {
      const res = await axios.put<UpdateProfileResponse>(
        `/api/instructor/profile`, 
        data
      );
      return res.data;
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["instructorProfile"] });

      toast({ 
        description: data.message || "Lưu thành công!",
        variant: "default"
      });
    },

    onError: (e: any) => {
      const errorMessage = e.response?.data?.message || "Có lỗi xảy ra!";
      
      toast({ 
        description: errorMessage,
        variant: "destructive" 
      });
    },
  });
};