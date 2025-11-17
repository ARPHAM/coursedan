"use client";

import { useState } from "react";
import Link from "next/link";
import { useDebouncedValue } from "@mantine/hooks"; 
import { useSearchParams } from "next/navigation"; // ✨ Thêm hook đọc tham số URL
import { Edit, Trash } from "lucide-react"; // ✨ Thêm icons

import { useGetInstructorCourses, CourseItem } from "./my-course/api/queries";
import { useDeleteCourse } from "./my-course/api/mutation";

export default function MyCoursesPage() {
  
    const searchParams = useSearchParams();
    const searchTermFromUrl = searchParams.get('search') || '';
    const [debouncedSearch] = useDebouncedValue(searchTermFromUrl, 500); // 💡 Vẫn dùng debounce cho an toàn

    // ✨ 2. Lấy dữ liệu (GET)
    const {
        data: paginatedData,
        isLoading, 
        isError,   
    } = useGetInstructorCourses({
        search: debouncedSearch || undefined, // Gửi search từ URL (đã debounce)
        limit: 20, 
    });

    const courses = paginatedData?.items;
    const deleteMutation = useDeleteCourse();

    const handleDelete = (id: number) => {
        if (!confirm("Bạn có chắc muốn xóa khóa học này?")) return;
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

    // === Render ===
    return (
        <div className="max-w-8xl mx-auto px-8 py-8"> {/* ✨ Thêm py-8 để có khoảng trống */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Khóa học của tôi</h1>

            </div>
            
            {/* ❌ Đã loại bỏ Input tìm kiếm cục bộ vì đã dùng thanh Global Header */}

            {courses.length === 0 ? (
                <p className="text-gray-500">Bạn chưa có khóa học nào.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course: CourseItem) => (
                        <div
                            key={course.id}
                            className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                        >
                            {/* 🖼️ Sử dụng tỉ lệ ảnh chuẩn 16:9 để giao diện đẹp hơn */}
                            <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="w-full aspect-video object-cover" 
                            />

                            <div className="p-4 flex flex-col gap-2">
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {/* ✨ Sửa logic hiển thị trạng thái (Published, Rejected, Pending/Draft) */}
                                    <span
                                        className={`px-2 py-0.5 rounded-full font-medium ${
                                            course.status === "Published"
                                            ? "bg-green-100 text-green-700"
                                            : course.status === "Rejected"
                                            ? "bg-red-100 text-red-700" 
                                            : "bg-yellow-100 text-yellow-700" 
                                        }`}
                                    >
                                        {course.status === "Published"
                                            ? "Đã xuất bản"
                                            : course.status === "Rejected"
                                            ? "Bị từ chối"
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

                                {/* ✨ Nút hành động với Icons */}
                                <div className="flex justify-between border-t pt-3 mt-auto gap-3">
                                    <Link
                                        href={`/teach/courses/${course.id}/edit`}
                                        className="flex-1 flex items-center justify-center gap-1 py-1.5 text-blue-600 text-sm font-medium border rounded-md hover:bg-blue-50 transition"
                                    >
                                        <Edit size={14} /> Sửa
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(course.id as number)}
                                        disabled={deleteMutation.isPending && deleteMutation.variables?.courseId === course.id}
                                        className="flex-1 flex items-center justify-center gap-1 py-1.5 text-red-600 text-sm font-medium border rounded-md hover:bg-red-50 transition disabled:opacity-50"
                                    >
                                        <Trash size={14} /> 
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