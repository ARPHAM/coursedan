"use client";

import { useState } from "react";
import Link from "next/link";
import { useDebouncedValue } from "@mantine/hooks"; 

import { useGetInstructorCourses, CourseItem } from "./my-course/api/queries";
import { useDeleteCourse } from "./my-course/api/mutation";

export default function MyCoursesPage() {
  // ✨ 1. State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  // Dùng debounce để không gọi API liên tục khi gõ
  const [debouncedSearch] = useDebouncedValue(searchTerm, 500); 

  // ✨ 2. Lấy dữ liệu (GET)
  const {
    data: paginatedData,
    isLoading, // Thay thế cho 'loading'
    isError,   // Thêm xử lý lỗi
  } = useGetInstructorCourses({
    search: debouncedSearch || undefined, // Gửi search nếu có
    limit: 20, // Lấy 20 khóa học
  });

  // ✨ Lấy mảng 'courses' từ data trả về
  const courses = paginatedData?.items;

  // ✨ 3. Lấy mutation (DELETE)
  const deleteMutation = useDeleteCourse();

  // ✨ 4. Hàm xử lý Xóa (đã được đơn giản hóa)
  const handleDelete = (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa khóa học này?")) return;
    
    // Chỉ cần gọi mutate. React Query sẽ tự động cập nhật UI
    deleteMutation.mutate({ courseId: id });
  };

  // ✨ 5. Xử lý Loading / Error
  if (isLoading)
    return (
      <div className="flex justify-center py-10 text-gray-500">
        Đang tải dữ liệu...
      </div>
    );

  if (isError || !courses) {
    return <div className="p-6 text-red-500">Lỗi: Không tải được dữ liệu.</div>;
  }

  // === Render (Giữ nguyên 100% JSX của bạn) ===
  return (
    <div className="max-w-8xl mx-auto px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Khóa học của tôi</h1>

      </div>
      
      <input
        type="text"
        placeholder="Tìm kiếm khóa học..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md border rounded-lg px-4 py-2 mb-6"
      />

      {courses.length === 0 ? (
        <p className="text-gray-500">Bạn chưa có khóa học nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sửa: map qua 'courses' */}
          {courses.map((course: CourseItem) => (
            <div
              key={course.id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 flex flex-col gap-2">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full font-medium ${
                      course.status === "Published" // Sửa: Dùng "Published" (viết hoa)
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.status === "Published"
                      ? "Đã xuất bản"
                      : "Chờ duyệt"}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                    {course.category}
                  </span>
                </div>

                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>

                <div className="text-sm text-gray-500 mt-2">
                  <p>Giá: {course.price.toLocaleString()} đ</p>
                  <p>Bài giảng: {course.lecturesCount || 0}</p>
                  <p>Thời lượng: {course.totalDuration || 0} giờ</p>
                </div>

                <div className="flex justify-between mt-3">
                  <Link
                    href={`/teach/courses/${course.id}/edit`}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id as number)}
                    disabled={deleteMutation.isPending && deleteMutation.variables?.courseId === course.id}
                    className="text-red-600 text-sm font-medium hover:underline disabled:opacity-50"
                  >
                    {/* ✨ Thêm trạng thái 'disabled' khi đang xóa */}
                    {deleteMutation.isPending && deleteMutation.variables?.courseId === course.id
                      ? "Đang xóa..."
                      : "Xóa"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}