"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";

export type CourseItem = {
  id: string | number;
  title: string;
  description: string;
  price: number;
  lecturesCount: number;
  totalDuration: number;
  category: string;
  imageUrl: string;
  status: "Published" | "Pending" | "Draft" | "Rejected";
};


export type PaginatedCourses = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  items: CourseItem[];
};


export type CourseQueryArgs = {
  status?: "Draft" | "Pending" | "Published";
  search?: string;
  page?: number;
  limit?: number;
};

// 4. Tạo custom hook
export const useGetInstructorCourses = (args: CourseQueryArgs) => { 
  return useQuery<PaginatedCourses>({
    // QueryKey: Phải bao gồm 'args'
    // Khi 'args' thay đổi (ví dụ: search), React Query sẽ tự fetch lại
    queryKey: ["instructorCourses", args], 
    
    queryFn: async () => {
      const res = await axios.get(`/api/instructor/courses`, {
        params: args, // Tự động chuyển { search: "..." } thành ?search=...
      });
      return res.data;
    },
  });
};