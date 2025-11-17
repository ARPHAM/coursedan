"use client";

import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

// ✨ Import hook từ file api (đường dẫn tương đối)
import { useGetCourseById } from "./api/queries";
import { useCreateSection, useSubmitCourse } from "./api/mutation";

// ✨ Import component con (đường dẫn tương đối)
import { SectionItem } from "./components/SectionItem";

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const courseId = id as string;
  const queryClient = useQueryClient();

  // ✨ 1. Lấy dữ liệu bằng React Query
  const {
    data: course,
    isLoading,
    isError,
  } = useGetCourseById(courseId);
  
  // ✨ 2. Khởi tạo các hook mutation
  const createSectionMutation = useCreateSection();
  const submitCourseMutation = useSubmitCourse();
  
  // ✨ 3. Hàm xử lý Thêm Section
  const handleAddSection = () => {
    const defaultSectionData = {
      title: "Phần mới (Bấm để sửa)",
    };
    createSectionMutation.mutate(
      { courseId: courseId, data: defaultSectionData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["course", courseId] });
        },
      }
    );
  };

  // ✨ 4. Hàm xử lý "Gửi duyệt"
  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitCourseMutation.mutate(
      { courseId: courseId },
      {
        onSuccess: () => {
          router.push("/teach");
        },
      }
    );
  };

  // ✨ 5. Xử lý Loading / Error
  if (isLoading) {
    return <div className="p-6">Đang tải...</div>;
  }
  if (isError || !course) {
    return <div className="p-6 text-red-500">Lỗi: Không tải được dữ liệu khóa học.</div>;
  }

  // === Render ===
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
        >
          <ChevronLeft size={16} /> Quay lại
        </button>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Chỉnh sửa khóa học</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* === Thông tin cơ bản === */}
        {/* ✨ Vô hiệu hóa các ô này theo quyết định "không cho sửa" */}
        <div className="bg-white border rounded-xl p-6 shadow-sm opacity-70">
          <h2 className="text-lg font-medium mb-1">Thông tin cơ bản</h2>
          <p className="text-sm text-gray-500 mb-5">
            Thông tin này được quản lý ở mục khác.
          </p>
          <div className="space-y-4">
            <input
              type="text"
              readOnly
              value={course.title}
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
            <textarea
              readOnly
              rows={3}
              value={course.description}
              className="w-full border rounded-lg px-3 py-2 resize-none bg-gray-100"
            />
            {/* ... các input khác cũng readOnly ... */}
          </div>
        </div>

        {/* === Nội dung khóa học === */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Nội dung khóa học</h2>
            <button
              type="button"
              onClick={handleAddSection}
              disabled={createSectionMutation.isPending}
              className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <Plus size={16} /> 
              {createSectionMutation.isPending ? "Đang thêm..." : "Thêm phần"}
            </button>
          </div>

          {/* ✨ 6. Render component con */}
          {course.sections.map((section: any, index: number) => (
            <SectionItem
              key={section.id || index}
              section={section}
              courseId={courseId}
            />
          ))}
        </div>

        {/* === Nút Gửi duyệt === */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={submitCourseMutation.isPending}
            className="px-5 py-2 border rounded-md hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={submitCourseMutation.isPending}
            className="px-5 py-2 bg-blue text-white rounded-md hover:bg-blue-800 disabled:opacity-50"
          >
            {submitCourseMutation.isPending ? "Đang gửi..." : "Gửi duyệt"}
          </button>
        </div>
      </form>
    </div>
  );
}