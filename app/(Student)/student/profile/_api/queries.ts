import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";

export type Info = {
  avatar: string | null;
  email: string;
  fullName: string;
  id: string;
  role: string | string[];
};

export const useInfoStudent = () => {
  return useQuery<Info>({
    queryKey: ["InfoStudent"],
    queryFn: async () => {
      const res = await axios.get("/api/Student/info");
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

// Type cho trạng thái đơn đăng ký
export type InstructorRequest = {
  id: string;
  userId: string;
  title: string;
  bio: string;
  experience: string;
  portfolioUrl: string | null;
  certificateUrl: string | null;
  status: "Pending" | "Approved" | "Rejected";
  rejectReason: string | null;
  createdAt: string;
  updatedAt: string;
};

// Hook kiểm tra trạng thái đơn đăng ký
export const useGetInstructorRequest = () => {
  return useQuery<InstructorRequest | null>({
    queryKey: ["instructor-request"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/Student/request-instructor");
        return res.data;
      } catch (error: any) {
        // Nếu 404 (chưa đăng ký) → trả về null
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });
};
