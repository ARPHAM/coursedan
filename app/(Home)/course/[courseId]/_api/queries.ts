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
      const res = await axios.get(`api/public/${id}`, {});
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

type Section = {
  id: number;
  courseId: number;
  title: string;
  totalLectures: number;
  totalDuration: string;
  lectures: {
    id: number;
    sectionId: number;
    courseId: number;
    title: string;
    descriptionUrl: string;
    orderIndex: number;
    length: number;
    duration: number;
    isPreview: boolean;
  }[];
}[];

export const useSection = (id: string) => {
  return useQuery<Section>({
    queryKey: ["Section", id],
    queryFn: async () => {
      const res = await axios.get(`/api/public/courses/${id}/sections`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
