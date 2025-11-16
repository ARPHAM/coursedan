import { useMutation } from "@tanstack/react-query";
import axios from "@/config/axios";
type MyCourse = {
  items: {
    courseId: number;
    title: string;
    imageUrl: string;
    description: string;
    instructor: string;
    rating: number;
    price: number;
    progressPercent: number;
    status: string;
  }[];
  total: number;
  itemsCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

type Params = {
  category?: string;
  sortBy?: string;
  sortField?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export const useMyCourses = () => {
  return useMutation<MyCourse, "", Params>({
    mutationFn: async (params) => {
      return await axios.get("/api/Student/my-courses", { params });
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
