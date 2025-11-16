"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/config/axios";
import { toast } from "@/components/ui/use-toast";

// 1. Tạo hook useDeleteCourse
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: Hàm này sẽ nhận ID
    mutationFn: async ({ courseId }: { courseId: string | number }) => {
      return axios.delete(`/api/instructor/courses/${courseId}`);
    },

    // onSuccess: Chạy khi xóa thành công
    onSuccess: async () => {
      // BÁO CHO REACT QUERY: "Dữ liệu 'instructorCourses' đã cũ, fetch lại!"
      // Việc này sẽ tự động làm mới danh sách khóa học trên UI
      queryClient.invalidateQueries({ queryKey: ["instructorCourses"] });

      toast({ description: "Xóa khóa học thành công!" });
    },

    // onError: Xử lý lỗi
    onError: (e: any) => {
      if (e.response?.data?.message)
        toast({ description: e.response.data.message, variant: "destructive" });
      else
        toast({ description: "Xóa thất bại!", variant: "destructive" });
    },
  });
};