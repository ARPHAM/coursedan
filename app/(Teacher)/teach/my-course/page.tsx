"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Giả lập API call
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/instructor/courses");
        if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa khóa học này?")) return;
    await fetch(`/api/instructor/courses/${id}`, { method: "DELETE" });
    setCourses(courses.filter((c) => c.id !== id));
  };

  if (loading)
    return (
      <div className="flex justify-center py-10 text-gray-500">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Khóa học của tôi</h1>
        <Link
          href="/teach/create"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          + Tạo khóa học mới
        </Link>
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-500">Bạn chưa có khóa học nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
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
                      course.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.status === "published"
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
                  <p>Bài giảng: {course.totalLectures || 0}</p>
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
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 text-sm font-medium hover:underline"
                  >
                    Xóa
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
