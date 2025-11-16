import axios from "@/config/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type CourseInfoDetail = {
  title: string;
  description: string;
  price: number;
  bought: boolean;
  imageUrl: string;
  instructor: string;
  numberOfStudents: number;
  numberOfRating: number;
  rating: number;
};

export const useCourseInfo = (id: string) => {
  return useQuery<CourseInfoDetail>({
    queryKey: ["ListCategory", id],
    queryFn: async () => {
      const res = await axios.get(`api/Student/${id}`, {});
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
