"use client";

import React from "react";

export default function MyCoursesPage() {
  // 🔹 Dữ liệu giả lập để dựng giao diện
  const mockCourses = [
    {
      id: 1,
      title: "Lập trình Web với React",
      description:
        "Khóa học toàn diện về React từ cơ bản đến nâng cao. Học cách xây dựng ứng dụng web hiện đại.",
      price: 1500000,
      lectures: 8,
      duration: 12,
      category: "Lập trình",
      image: "https://placehold.co/600x400?text=React+Course",
    },
    {
      id: 2,
      title: "Python cho Khoa học Dữ liệu",
      description:
        "Khám phá thế giới Data Science với Python. Học pandas, numpy, matplotlib...",
      price: 2000000,
      lectures: 10,
      duration: 15,
      category: "Data Science",
      image: "https://placehold.co/600x400?text=Python+Course",
    },
    {
      id: 3,
      title: "Thiết kế UI/UX với Figma",
      description:
        "Làm chủ Figma để tạo ra những thiết kế UX/UI chuyên nghiệp.",
      price: 1200000,
      lectures: 6,
      duration: 8,
      category: "Thiết kế",
      image: "https://placehold.co/600x400?text=Figma+Course",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Khóa học của tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                  Đã xuất bản
                </span>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                  {course.category}
                </span>
              </div>

              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {course.description}
              </p>

              <div className="text-sm text-gray-500 mt-2">
                <p>Giá: {course.price.toLocaleString()} đ</p>
                <p>Bài giảng: {course.lectures}</p>
                <p>Thời lượng: {course.duration} giờ</p>
              </div>

              <div className="flex justify-between mt-3">
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Sửa
                </button>
                <button className="text-red-600 text-sm font-medium hover:underline">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
