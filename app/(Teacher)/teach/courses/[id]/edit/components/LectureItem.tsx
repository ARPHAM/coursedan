"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
// Cài đặt thư viện này: npm install use-debounce
import { useDebouncedCallback } from "use-debounce"; 
// Import hook từ file api (đường dẫn tương đối)
import { useUpdateLecture, useDeleteLecture } from "../api/mutation";

export const LectureItem = ({ lecture, courseId }: any) => {
  const queryClient = useQueryClient();
  
  const updateLectureMutation = useUpdateLecture();
  const deleteLectureMutation = useDeleteLecture();

  // Hàm helper để làm mới data
  const invalidateCourseData = () => {
    queryClient.invalidateQueries({ queryKey: ["course", courseId] });
  };

  // 1. Logic Sửa (Lưu tự động)
  const handleUpdate = useDebouncedCallback((field: string, value: string | boolean) => {
    updateLectureMutation.mutate(
      { lectureId: lecture.id, data: { [field]: value } },
      { onSuccess: invalidateCourseData } // Gọi invalidate sau khi thành công
    );
  }, 1000); // Chờ 1s sau khi gõ xong mới gọi API

  // 2. Logic Xóa
  const handleDelete = () => {
    if (confirm("Bạn chắc chắn muốn xóa bài giảng này?")) {
      deleteLectureMutation.mutate(
        { lectureId: lecture.id },
        { onSuccess: invalidateCourseData } // Gọi invalidate sau khi thành công
      );
    }
  };

  return (
    <div className="bg-white border rounded-lg p-3 mb-2">
      <div className="flex justify-between items-start mb-2">
        <input
          type="text"
          placeholder="Tiêu đề bài giảng"
          defaultValue={lecture.title}
          onChange={(e) => handleUpdate("title", e.target.value)}
          disabled={updateLectureMutation.isPending}
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteLectureMutation.isPending}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          {deleteLectureMutation.isPending ? "..." : <Trash2 size={16} />}
        </button>
      </div>

      <textarea
        placeholder="Mô tả ngắn"
        defaultValue={lecture.description}
        onChange={(e) => handleUpdate("description", e.target.value)}
        disabled={updateLectureMutation.isPending}
        className="w-full border rounded-lg px-3 py-2 mb-2"
      />
      
      {/* ... Thêm các input khác (videoUrl, duration) và dùng onChange={handleUpdate} ... */}

      <label className="mt-2 flex items-center text-sm text-gray-700">
        <input
          type="checkbox"
          defaultChecked={lecture.isFree}
          onChange={(e) => handleUpdate("isFree", e.target.checked)}
          className="mr-2"
        />
        Học miễn phí
      </label>
    </div>
  );
};