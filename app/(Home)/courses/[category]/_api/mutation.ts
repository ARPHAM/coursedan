import { useMutation } from "@tanstack/react-query";
import axios from "@/config/axios";
type MyCourse = {
  items: {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    instructor: string;
    rating: number;
  }[];
  total: number;
  itemsCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

type Params = {
  category?: string;
  page?: number;
};

export const useCourses = () => {
  return useMutation({
    mutationFn: async (params: Params) => {
      const { data }: { data: MyCourse } = await axios.get(
        "/api/public/courses",
        { params }
      );
      return data;
    },
    onSuccess: (res) => {},
    onError: () => {},
  });
};
