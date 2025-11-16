"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";

// Nếu cần query gì cho trang create, thêm vào đây
// Ví dụ: Lấy danh sách categories để chọn

export type Category = {
  id: string;
  name: string;
  slug: string;
};

// Hook lấy danh sách categories
export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/api/categories");
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // Cache 10 phút
  });
};