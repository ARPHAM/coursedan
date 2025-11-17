"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/config/axios";
import { toast } from "@/components/ui/use-toast";

// Type cho data tạo khóa học
export type CreateCourseDto = {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
};

// Type cho response
type CreateCourseResponse = {
  id: number;
  title: string;
  status: "Draft";
  price: number;
  imageUrl: string | null;
  sections: Array<{
    id: number;
    title: string;
    orderIndex: number;
    lectures: any[];
  }>;
  message: string;
};

// Hook tạo khóa học
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourseDto) => {
      const res = await axios.post<CreateCourseResponse>("/api/instructor/create-courses", data);
      return res.data;
    },
    
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
      
      toast({ 
        title: "Tạo khóa học thành công! 🎉",
        description: "Bạn sẽ được chuyển sang trang chỉnh sửa để thêm bài giảng.",
        variant: "default" 
      });
    },
    
    onError: (error: any) => {
      toast({ 
        description: error.response?.data?.message || "Tạo khóa học thất bại!",
        variant: "destructive" 
      });
    },
  });
};