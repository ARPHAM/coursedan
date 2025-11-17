import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";
import { cleanObject } from "@/app/utils/cleanObject";
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

export const useMyCourses = (params: Params) => {
  return useQuery<MyCourse>({
    queryKey: ["ListMyCourses", params],
    queryFn: async () => {
      const res = await axios.get("/api/Student/my-courses", {
        params: cleanObject(params),
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
