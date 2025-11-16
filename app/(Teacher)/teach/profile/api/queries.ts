"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";

// 1. Định nghĩa kiểu dữ liệu khớp với API response
export type InstructorProfile = {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  title: string;
  bio: string;
  experience: string;
  certificateUrl: string;
  portfolioUrl: string;
  status: "Pending" | "Approved" | "Rejected";
  rejectReason: string | null;
  reviewedByAdminId: string | null;
  createdAt: string;
  updatedAt: string;
};

// 2. Custom hook
export const useGetInstructorProfile = () => {
  return useQuery<InstructorProfile | null>({
    
    queryKey: ["instructorProfile"], 
    
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/instructor/profile`);
        return res.data;
      } catch (error: any) {
        // Nếu 404 (chưa có profile) → trả về null thay vì throw error
        if (error.response?.status === 404) {
          return null;
        }
        // Lỗi khác thì throw
        throw error;
      }
    },
    
    retry: false, // Không retry khi 404
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};