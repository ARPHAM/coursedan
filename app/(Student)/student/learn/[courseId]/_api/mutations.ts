import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "@/config/axios";

import { toast } from "@/components/ui/use-toast";

type dataComment = {
  content: string;
};

export const useComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lectureId,
      data,
    }: {
      lectureId: string;
      data: dataComment;
    }) => {
      return axios.post(`/api/Student/${lectureId}/comment`, {
        ...data,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["lecture"] });
    },
    onError: (e: any) => {
      toast({ description: "Comment thất bại!", variant: "destructive" });
    },
  });
};

export const useReplyComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lectureId,
      commentId,
      data,
    }: {
      lectureId: string;
      commentId: string;
      data: dataComment;
    }) => {
      return axios.post(
        `/api/Student/${lectureId}/comment/${commentId}/reply`,
        {
          ...data,
        }
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["lecture"] });
    },
    onError: (e: any) => {
      toast({ description: "Reply thất bại!", variant: "destructive" });
    },
  });
};

type dataReview = {
  rating: number;
  comment: string;
};

export const useReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      courseId,
      data,
    }: {
      courseId: string;
      data: dataReview;
    }) => {
      return axios.post(`/api/Student/${courseId}/review`, {
        ...data,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
    onError: (e: any) => {
      toast({ description: "Reply thất bại!", variant: "destructive" });
    },
  });
};
