"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Plus } from "lucide-react";

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams();

  const [course, setCourse] = useState<any>({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    imageUrl: "",
    lessons: [],
  });

  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
  });

  useEffect(() => {
    // 🧩 Giả lập dữ liệu ban đầu
    setCourse({
      title: "DevOps và Docker",
      description:
        "Tìm hiểu về DevOps practices và containerization với Docker. Deploy ứng dụng một cách hiệu quả.",
      category: "DevOps",
      level: "Nâng cao",
      price: "1800000",
       imageUrl: "/images/course.jpg",
      lessons: [
        {
          title: "Giới thiệu Docker",
          description: "Tổng quan về container và image.",
          videoUrl: "https://example.com/video.mp4",
          duration: "15:30",
        },
      ],
    });
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCourse((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddLesson = () => {
    if (!newLesson.title) return;
    setCourse((prev: any) => ({
      ...prev,
      lessons: [...prev.lessons, newLesson],
    }));
    setNewLesson({ title: "", description: "", videoUrl: "", duration: "" });
  };

  const handleLessonChange = (index: number, field: string, value: string) => {
    const updatedLessons = [...course.lessons];
    updatedLessons[index][field] = value;
    setCourse((prev: any) => ({ ...prev, lessons: updatedLessons }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("✅ Khóa học đã được cập nhật");
    router.push("/teach");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
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
        {/* Thông tin cơ bản */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-1">Thông tin cơ bản</h2>
          <p className="text-sm text-gray-500 mb-5">
            Điền thông tin cơ bản về khóa học của bạn
          </p>

          <div className="space-y-4">
            {/* Tên khóa học */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tên khóa học
              </label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <textarea
                name="description"
                rows={3}
                value={course.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-gray-400 resize-none"
              ></textarea>
            </div>

            {/* Danh mục + Cấp độ */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Danh mục</label>
                <select
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option>DevOps</option>
                  <option>Lập trình Web</option>
                  <option>Data Science</option>
                  <option>AI/ML</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cấp độ</label>
                <select
                  name="level"
                  value={course.level}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option>Cơ bản</option>
                  <option>Trung cấp</option>
                  <option>Nâng cao</option>
                </select>
              </div>
            </div>

            {/* Giá */}
            <div>
              <label className="block text-sm font-medium mb-1">Giá (VNĐ)</label>
              <input
                type="number"
                name="price"
                value={course.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Ảnh đại diện */}
            <div>
              <label className="block text-sm font-medium mb-1">
                URL ảnh đại diện
              </label>
              <input
                type="text"
                name="imageUrl"
                value={course.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt="Course"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>
        </div>

        {/* Nội dung khóa học */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium">Nội dung khóa học</h2>
              <p className="text-sm text-gray-500">
                Thêm các bài giảng cho khóa học
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddLesson}
              className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <Plus size={16} /> Thêm bài
            </button>
          </div>

          {/* Danh sách bài học */}
          <div className="space-y-5">
            {course.lessons.map((lesson: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Bài {index + 1}</h3>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tiêu đề bài giảng"
                    value={lesson.title}
                    onChange={(e) =>
                      handleLessonChange(index, "title", e.target.value)
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  />

                  <input
                    type="text"
                    placeholder="Mô tả ngắn"
                    value={lesson.description}
                    onChange={(e) =>
                      handleLessonChange(index, "description", e.target.value)
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={lesson.videoUrl}
                      onChange={(e) =>
                        handleLessonChange(index, "videoUrl", e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Thời lượng"
                      value={lesson.duration}
                      onChange={(e) =>
                        handleLessonChange(index, "duration", e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2 border rounded-md hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded-md"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
