import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: async () => {
      const { data }: { data: Course } = await axios.get(
        `/api/Student/${id}/learn`
      );
      console.log(data);
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
