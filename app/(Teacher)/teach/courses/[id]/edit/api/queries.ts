"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/config/axios"; // Giả sử đây là file config axios của bạn

// 1. Định nghĩa kiểu dữ liệu (Type) cho Course
// Bạn nên định nghĩa kiểu này chi tiết hơn dựa trên API response
export type Lecture = {
  id: string | number;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  isFree: boolean;
};

export type Section = {
  id: string | number;
  title: string;
  lectures: Lecture[];
};

export type CourseDetails = {
  id: string | number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  sections: Section[];
  // ... thêm các trường khác mà API trả về
};

// 2. Tạo custom hook
export const useGetCourseById = (id: string) => {
  return useQuery<CourseDetails>({ // Ghi rõ kiểu <CourseDetails>
    
    // QueryKey: Phải có 'id' để React Query biết
    // query này là riêng biệt cho từng course
    queryKey: ["course", id], 
    
    queryFn: async () => {
      // Gọi thẳng API với 'id' động
      const res = await axios.get(`/api/instructor/courses/${id}`);
      return res.data;
    },
    
    // Rất quan trọng: Bật/tắt query
    // Chỉ chạy query khi 'id' đã tồn tại (không phải undefined, null, or "")
    enabled: !!id, 
  });
};