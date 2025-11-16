"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { LectureItem } from "./LectureItem"; // Import component con
// Import hook từ file api (đường dẫn tương đối)
import {
  useUpdateSection,
  useDeleteSection,
  useCreateLecture,
} from "../api/mutation";

export const SectionItem = ({ section, courseId }: any) => {
  const queryClient = useQueryClient();

  const updateSectionMutation = useUpdateSection();
  const deleteSectionMutation = useDeleteSection();
  const createLectureMutation = useCreateLecture();

  // Hàm helper
  const invalidateCourseData = () => {
    queryClient.invalidateQueries({ queryKey: ["course", courseId] });
  };

  // 1. Logic Sửa Section
  const handleUpdateTitle = useDebouncedCallback((title: string) => {
    updateSectionMutation.mutate(
      { sectionId: section.id, data: { title } },
      { onSuccess: invalidateCourseData }
    );
  }, 1000);

  // 2. Logic Xóa Section
  const handleDelete = () => {
    if (confirm("Xóa PHẦN này sẽ xóa hết bài giảng bên trong. Bạn chắc chắn?")) {
      deleteSectionMutation.mutate(
        { sectionId: section.id },
        { onSuccess: invalidateCourseData }
      );
    }
  };
  
  // 3. Logic Thêm Bài giảng (Lecture)
  const handleAddLecture = () => {
    const defaultLectureData = {
      title: "Bài giảng mới",
      duration: "00:00",
    };
    createLectureMutation.mutate(
      { sectionId: section.id, data: defaultLectureData },
      { onSuccess: invalidateCourseData }
    );
  };

  return (
    <div className="border rounded-lg p-4 mb-5 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          defaultValue={section.title}
          onChange={(e) => handleUpdateTitle(e.target.value)}
          disabled={updateSectionMutation.isPending}
          className="font-medium text-gray-800 w-full border-b px-2 py-1 bg-transparent"
        />
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteSectionMutation.isPending}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          {deleteSectionMutation.isPending ? "..." : <Trash2 size={16} />}
        </button>
      </div>

      {section.lectures.map((lecture: any) => (
        <LectureItem
          key={lecture.id}
          lecture={lecture}
          courseId={courseId}
        />
      ))}

      <button
        type="button"
        onClick={handleAddLecture}
        disabled={createLectureMutation.isPending}
        className="mt-2 flex items-center gap-1 text-sm text-gray-600 hover:text-black"
      >
        <Plus size={14} /> 
        {createLectureMutation.isPending ? "Đang thêm..." : "Thêm bài giảng"}
      </button>
    </div>
  );
};