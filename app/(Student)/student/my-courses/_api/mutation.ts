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
  return useMutation({
    mutationFn: async (params: Params) => {
      const { data }: { data: MyCourse } = await axios.get(
        "/api/Student/my-courses",
        { params }
      );
      return data;
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
