"use client";

import Image from "next/image";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function CourseApprovalPage() {
  // --- Khóa học chờ duyệt ---
  const pendingCourses = [
    {
      id: 1,
      title: "DevOps và Docker",
      level: "Nâng cao",
      category: "DevOps",
      description:
        "Tìm hiểu về DevOps practices và containerization với Docker. Deploy ứng dụng dễ dàng.",
      price: "1.800.000 đ",
      lessons: 7,
      instructor: "John Instructor",
      image: "/images/course-devops.jpg",
    },
  ];

  // --- Khóa học đã xử lý ---
  const approvedCourses = [
    {
      id: 2,
      title: "Lập trình Web với React",
      instructor: "John Instructor",
      image: "/images/course-react.jpg",
    },
    {
      id: 3,
      title: "Python cho Khoa học Dữ liệu",
      instructor: "John Instructor",
      image: "/images/course-python.jpg",
    },
    {
      id: 4,
      title: "Thiết kế UI/UX với Figma",
      instructor: "John Instructor",
      image: "/images/course-figma.jpg",
    },
  ];

  return (
    <div className="space-y-10">
      {/* --- Tiêu đề trang --- */}
      <h1 className="text-2xl font-bold text-[#0a092d]">Kiểm duyệt Khóa học</h1>

      {/* --- Tổng quan --- */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
        <p className="text-gray-700 text-sm">
          Có {pendingCourses.length} khóa học đang chờ duyệt
        </p>
      </div>

      {/* --- Phần chờ duyệt --- */}
      <section>
        <h2 className="text-lg font-semibold text-[#0a092d] mb-4">
          Khóa học chờ duyệt
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Ảnh */}
              <div className="h-40 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nội dung */}
              <div className="p-4 space-y-3">
                {/* Tag */}
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                    {course.category}
                  </span>
                  <span className="bg-gray-100 border border-gray-300 text-gray-700 px-2 py-1 rounded-md">
                    {course.level}
                  </span>
                </div>

                {/* Tiêu đề & mô tả */}
                <h3 className="font-semibold text-[#0a092d] text-base">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>

                {/* Thông tin */}
                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Giảng viên:</span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giá:</span>
                    <span className="font-medium">{course.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bài giảng:</span>
                    <span>{course.lessons}</span>
                  </div>
                </div>

                {/* Nút xem chi tiết */}
                <div className="mt-3 border border-gray-300 rounded-md py-2 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition">
                  <Eye className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-800">
                    Xem chi tiết
                  </span>
                </div>

                {/* Hai nút duyệt/từ chối */}
                <div className="flex justify-center gap-3 pt-3">
                  <button className="flex items-center gap-1 bg-[#00A651] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#009245] transition">
                    <CheckCircle className="w-4 h-4" />
                    Duyệt
                  </button>
                  <button className="flex items-center gap-1 bg-[#E60000] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#CC0000] transition">
                    <XCircle className="w-4 h-4" />
                    Từ chối
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Phần đã xử lý --- */}
      <section>
        <h2 className="text-lg font-semibold text-[#0a092d] mb-4">
          Khóa học đã xử lý
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-40 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <span className="bg-[#00A651] text-white text-xs px-2 py-1 rounded-md">
                  Đã xuất bản
                </span>
                <h3 className="font-semibold text-[#0a092d] text-base mt-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Giảng viên: {course.instructor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
