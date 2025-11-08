"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash } from "lucide-react";

export default function TeachDashboardPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCourses([
      {
        id: 1,
        title: "DevOps và Docker",
        description:
          "Tìm hiểu về DevOps practices và containerization với Docker. Deploy ứng dụng một cách hiệu quả.",
        price: "1.800.000",
        lectures: 7,
        duration: "10 giờ",
        imageUrl: "/images/course.jpg",
        status: "Chờ duyệt",
        category: "DevOps",
      },
      {
        id: 2,
        title: "Lập trình Web với React",
        description:
          "Khóa học toàn diện về React từ cơ bản đến nâng cao. Xây dựng ứng dụng web hiện đại với Next.js.",
        price: "1.500.000",
        lectures: 8,
        duration: "12 giờ",
        imageUrl: "/images/banner.png",
        status: "Đã xuất bản",
        category: "Lập trình",
      },
      {
        id: 3,
        title: "Lập trình Web với Angular",
        description:
          "Khóa học chuyên sâu về Angular. Tạo ứng dụng hiệu suất cao với kiến trúc mạnh mẽ.",
        price: "1.900.000",
        lectures: 10,
        duration: "20 giờ",
        imageUrl: "/images/banner.png",
        status: "Đã xuất bản",
        category: "Lập trình",
      },
      {
        id: 4,
        title: "Node.js Cơ bản",
        description:
          "Làm quen với Node.js và Express để xây dựng ứng dụng backend chuyên nghiệp.",
        price: "1.200.000",
        lectures: 6,
        duration: "8 giờ",
        imageUrl: "/images/banner.png",
        status: "Đã xuất bản",
        category: "Backend",
      },
      {
        id: 5,
        title: "Python cho người mới bắt đầu",
        description:
          "Khóa học nhập môn Python với nhiều ví dụ thực tế, phù hợp cho người mới bắt đầu lập trình.",
        price: "900.000",
        lectures: 5,
        duration: "6 giờ",
        imageUrl: "/images/banner.png",
        status: "Chờ duyệt",
        category: "Lập trình",
      },
      {
        id: 6,
        title: "Kubernetes nâng cao",
        description:
          "Tìm hiểu cách triển khai và quản lý ứng dụng với Kubernetes trong môi trường thực tế.",
        price: "2.000.000",
        lectures: 9,
        duration: "15 giờ",
        imageUrl: "/images/course.jpg",
        status: "Đã xuất bản",
        category: "DevOps",
      },
    ]);
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/teach/courses/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa khóa học này không?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xuất bản":
        return "bg-green-100 text-green-800";
      case "Chờ duyệt":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Khóa học của tôi</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">Bạn chưa có khóa học nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />

              <div className="p-3 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span
                    className={`${getStatusColor(
                      course.status
                    )} text-xs px-2 py-1 rounded-full font-medium`}
                  >
                    {course.status}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-sm font-semibold line-clamp-1 mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {course.description}
                </p>

                <p className="text-xs text-gray-700">
                  <strong>Giá:</strong>{" "}
                  <span className="text-gray-900 font-semibold">
                    {course.price} đ
                  </span>
                </p>

                <div className="flex justify-between text-xs text-gray-600 mt-1 mb-3">
                  <span>Bài giảng: {course.lectures}</span>
                  <span>⏱ {course.duration}</span>
                </div>

                <div className="flex justify-between border-t pt-2 gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(course.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs border rounded-md hover:bg-gray-100 transition"
                  >
                    <Edit size={14} /> Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs border rounded-md text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash size={14} /> Xóa
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
