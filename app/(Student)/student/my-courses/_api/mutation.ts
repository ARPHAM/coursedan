import { useMutation } from "@tanstack/react-query";
import axios from "@/config/axios";
type MyCourse = {
  items: {
    courseId: number;
    title: string;
    imageUrl: string;
    description: string;
    instructor: string;
    rating: string;
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

export const useMyCourses = () => {
  return useMutation({
    mutationFn: async () => {
      const { data }: { data: MyCourse } = await axios.get(
        "/api/Student/my-courses"
      );
      return data;
    },
    onSuccess: (res) => {
      console.log("Haizz success", res);
    },
    onError: () => {
      console.log("Haizz error");
    },
  });
};
