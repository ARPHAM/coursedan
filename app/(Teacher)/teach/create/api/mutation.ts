// Ví dụ: File đặt tại app/(Teacher)/teach/create/api/mutation.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/config/axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// Định nghĩa kiểu dữ liệu cho dữ liệu gửi lên API
export type CreateCourseData = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  sections: {
    title: string;
    lectures: {
      title: string;
      description: string;
      videoUrl: string;
      duration: number; // <-- ĐÃ ĐƯỢC SỬA: Phải là number
      isFree: boolean;
    }[];
  }[];
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    // mutationFn: Gửi dữ liệu qua phương thức POST
    mutationFn: async (data: CreateCourseData) => {
      const res = await axios.post("/api/instructor/course", data);
      return res.data;
    },

    onSuccess: () => {
      // 1. Thông báo thành công
      toast({ description: "Tạo khóa học thành công!" });
      
      // 2. Vô hiệu hóa cache ("instructorCourses") để danh sách khóa học tự động tải lại
      queryClient.invalidateQueries({ queryKey: ["instructorCourses"] }); 
      
      // 3. Chuyển hướng người dùng về trang quản lý khóa học
      router.push("/teach"); 
    },

    onError: (e: any) => {
      // Hiển thị thông báo lỗi cụ thể từ API hoặc thông báo mặc định
      const message = e.response?.data?.message || "Tạo khóa học thất bại. Vui lòng kiểm tra lại dữ liệu.";
      toast({ description: message, variant: "destructive" });
    },
  });
};