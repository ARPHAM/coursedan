import { useRouter } from "next/navigation";

export default function MyCoursesPage() {
  const router = useRouter();
  // ... phần mockCourses giữ nguyên

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

              {/* 🔹 Nút hành động */}
              <div className="flex justify-between mt-3">
                <button
                  className="text-blue-600 text-sm font-medium hover:underline"
                  onClick={() => router.push(`/teach/course/${course.id}`)}
                >
                  Xem chi tiết
                </button>

                <button
                  className="text-green-600 text-sm font-medium hover:underline"
                  onClick={() => router.push(`/teach/edit/${course.id}`)}
                >
                  Sửa
                </button>

                <button
                  className="text-red-600 text-sm font-medium hover:underline"
                  onClick={() => alert("Xóa khóa học")}
                >
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
