"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/config/axios";
import { toast } from "@/components/ui/use-toast";

// Type cho data đăng ký
export type ApplyInstructorDto = {
  title: string;
  bio: string;
  experience: string;
  portfolioUrl?: string;
  certificateUrl?: string;
};

// Hook gửi đơn đăng ký
export const useApplyInstructor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ApplyInstructorDto) => {
      const res = await axios.post("/api/Student/request-instructor", data);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["instructor-request"] });
      
      toast({
        title: "Gửi đơn thành công! 🎉",
        description: data.message || "Đơn đăng ký đang chờ admin phê duyệt.",
      });
    },

    onError: (error: any) => {
      toast({
        description: error.response?.data?.message || "Gửi đơn thất bại!",
        variant: "destructive",
      });
    },
  });
};