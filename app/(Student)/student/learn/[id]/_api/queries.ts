import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";
type Course = {
  id: number;
  title: string;
  urlVid: string;
  progress: number;
  rating: {
    "0": 0;
    "1": 0;
    "2": 0;
    "3": 0;
    "4": 0;
    "5": 1;
  };
  comment: {
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
      return await axios.get(`/api/Student/${id}/learn`);
    },
  });
};
