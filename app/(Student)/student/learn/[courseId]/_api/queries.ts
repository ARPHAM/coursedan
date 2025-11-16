import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";
type Course = {
  id: number;
  title: string;
  urlVid: string;
  progress: number;
  rating: {
    "0": number;
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
  comments: {
    author: string;
    atTime: string;
    avatar: string;
    content: string;
    reply: {
      author: string;
      atTime: string;
      avatar: string;
      content: string;
    }[];
  }[];
};

export const useCourse = (id: string) => {
  return useQuery<Course>({
    queryKey: ["Course", id],
    queryFn: async () => {
      const res = await axios.get(`/api/Student/${id}/learn`);
      return res.data;
    },
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

type Section = {
  id: number;
  title: string;
  totalLength: string;
  totalDuration: string;
  lectures: {
    id: number;
    title: string;
    duration: string;
    process: number;
  }[];
}[];

export const useSection = (id: string) => {
  return useQuery<Section>({
    queryKey: ["Section", id],
    queryFn: async () => {
      const res = await axios.get(`/api/Student/${id}/sections`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
