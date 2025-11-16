"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/config/axios"; // Giả sử config axios của bạn ở đây
import { toast } from "@/components/ui/use-toast"; // Import toast

// === DTO (Kiểu dữ liệu) ===
export type SectionDto = { title: string; orderIndex?: number };
export type LectureDto = {
  title: string;
  videoUrl?: string;
  duration?: number | string;
  content?: string;
  orderIndex?: number;
};
export type UpdateLectureDto = Partial<LectureDto>;

// === Helper Invalidation ===
const invalidateCourse = (queryClient: any, courseId: string | number) => {
  queryClient.invalidateQueries({ queryKey: ["course", courseId] });
};

// === 1. HOOK CHO NÚT GỬI DUYỆT ===
export const useSubmitCourse = () => {
  return useMutation({
    mutationFn: async ({ courseId }: { courseId: string | number }) => {
      return axios.put(`/api/instructor/courses/${courseId}/submit`);
    },
    onSuccess: (data) => {
      toast({ description: data.data.message || "Gửi duyệt thành công!" });
    },
    onError: (e: any) => {
      if (e.response?.data?.message)
        toast({ description: e.response.data.message, variant: "destructive" });
    },
  });
};

// === 2. HOOKS CHO SECTION ===
export const useCreateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, data }: { courseId: string | number, data: SectionDto }) => {
      return axios.post(`/api/instructor/courses/${courseId}/sections`, data);
    },
    onSuccess: (data, variables) => {
      toast({ description: "Tạo Section thành công!" });
      invalidateCourse(queryClient, variables.courseId);
    },
    onError: (e: any) => {
      toast({ description: "Tạo Section thất bại!", variant: "destructive" });
    },
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sectionId, data }: { sectionId: string | number, data: Partial<SectionDto> }) => {
      return axios.put(`/api/instructor/sections/${sectionId}`, data);
    },
    onSuccess: (data, variables) => {
      toast({ description: "Cập nhật Section thành công!" });
    },
    onError: (e: any) => {
      toast({ description: "Cập nhật Section thất bại!", variant: "destructive" });
    },
  });
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sectionId }: { sectionId: string | number }) => {
      return axios.delete(`/api/instructor/sections/${sectionId}`);
    },
    onSuccess: () => {
      toast({ description: "Xóa Section thành công!" });
    },
    onError: (e: any) => {
      toast({ description: "Xóa Section thất bại!", variant: "destructive" });
    },
  });
};

// === 3. HOOKS CHO LECTURE ===
export const useCreateLecture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sectionId, data }: { sectionId: string | number, data: LectureDto }) => {
      return axios.post(`/api/instructor/sections/${sectionId}/lectures`, data);
    },
    onSuccess: () => {
      toast({ description: "Tạo Bài giảng thành công!" });
    },
    onError: (e: any) => {
      toast({ description: "Tạo Bài giảng thất bại!", variant: "destructive" });
    },
  });
};

export const useUpdateLecture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ lectureId, data }: { lectureId: string | number, data: UpdateLectureDto }) => {
      return axios.put(`/api/instructor/lectures/${lectureId}`, data);
    },
    onSuccess: (data) => {
      toast({ description: data.data.message || "Cập nhật Bài giảng thành công!" });
    },
    onError: (e: any) => {
      toast({ description: "Cập nhật Bài giảng thất bại!", variant: "destructive" });
    },
  });
};

export const useDeleteLecture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ lectureId }: { lectureId: string | number }) => {
      return axios.delete(`/api/instructor/lectures/${lectureId}`);
    },
    onSuccess: () => {
      toast({ description: "Xóa Bài giảng thành công!" });
    },
    onError: (e: any) => {
      toast({ description: "Xóa Bài giảng thất bại!", variant: "destructive" });
    },
  });
};