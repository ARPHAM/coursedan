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
      const res = await axios.post("/api/instructor/create-courses", data);
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
    // ⚠️ BƯỚC QUAN TRỌNG: Ghi lại toàn bộ đối tượng lỗi E để xem nguyên nhân gốc
    console.error("LỖI AXIOS CHI TIẾT:", e); 
    
    let errorMessage = "Tạo khóa học thất bại. Vui lòng kiểm tra lại dữ liệu.";

    // Kiểm tra và xử lý lỗi cụ thể (chỉ khi e.response tồn tại)
    if (e.response) {
        // 1. Lấy thông báo lỗi từ body
        if (e.response.data && e.response.data.message) {
            errorMessage = e.response.data.message;
        } 
        // 2. Nếu không có message, kiểm tra Status Code để đưa ra gợi ý
        else if (e.response.status === 400) {
            errorMessage = "Lỗi 400: Dữ liệu không hợp lệ (Kiểm tra lại Title, Price, Section Title).";
        }
        else if (e.response.status === 401 || e.response.status === 403) {
            errorMessage = "Lỗi 401/403: Vui lòng đăng nhập lại (Token hết hạn).";
        }
    } else {
        // Nếu không có e.response (lỗi mạng/CORS), dùng thông báo của Axios
        errorMessage = `Lỗi Mạng/CORS: ${e.message || "Không thể kết nối đến máy chủ."}`;
    }

    toast({ description: errorMessage, variant: "destructive" });
},
  }); // <-- Khối useMutation kết thúc
}; 