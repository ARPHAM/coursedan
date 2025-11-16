"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/config/axios";
import { toast } from "@/components/ui/use-toast";

// DTO cho việc update
export type UpdateProfileDto = {
  title: string;
  bio: string;
  experience: string;
  certificateUrl: string;
  portfolioUrl: string;
};

// Response type từ PUT API
type UpdateProfileResponse = {
  message: string;
  profile: {
    id: string;
    userId: string;
    title: string;
    bio: string;
    experience: string;
    certificateUrl: string;
    portfolioUrl: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
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
      // Invalidate để fetch lại data mới
      queryClient.invalidateQueries({ queryKey: ["instructorProfile"] });

      toast({ 
        description: data.message || "Cập nhật hồ sơ thành công!",
        variant: "default"
      });
    },

    onError: (e: any) => {
      const errorMessage = e.response?.data?.message || "Cập nhật thất bại!";
      
      toast({ 
        description: errorMessage,
        variant: "destructive" 
      });
    },
  });
};

// Hook mới: Tạo profile lần đầu (đăng ký làm giảng viên)
export const useCreateInstructorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileDto) => {
      // PUT sẽ tự động tạo mới nếu chưa có (theo API docs của bạn)
      const res = await axios.put<UpdateProfileResponse>(
        `/api/instructor/profile`, 
        data
      );
      return res.data;
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["instructorProfile"] });

      toast({ 
        title: "Đăng ký thành công!",
        description: "Hồ sơ của bạn đang chờ admin phê duyệt.",
        variant: "default"
      });
    },

    onError: (e: any) => {
      const errorMessage = e.response?.data?.message || "Đăng ký thất bại!";
      
      toast({ 
        description: errorMessage,
        variant: "destructive" 
      });
    },
  });
};