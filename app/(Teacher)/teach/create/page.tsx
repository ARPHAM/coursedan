"use client";

import { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const [lessons, setLessons] = useState([
    { title: "", description: "", videoUrl: "", duration: "" },
  ]);

  const addLesson = () => {
    setLessons([
      ...lessons,
      { title: "", description: "", videoUrl: "", duration: "" },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      {/* Quay lại */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-700">
        <ArrowLeft className="w-4 h-4" />
        <Link href="/teach/dashboard" className="hover:underline">
          Quay lại
        </Link>
      </div>

      {/* Tiêu đề */}
      <h1 className="text-2xl font-semibold mb-8">Tạo khóa học mới</h1>

      {/* === Thông tin cơ bản === */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border">
        <h2 className="text-lg font-semibold mb-1">Thông tin cơ bản</h2>
        <p className="text-sm text-gray-500 mb-4">
          Điền thông tin cơ bản về khóa học của bạn
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Tên khóa học
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Lập trình Web với React"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              placeholder="Mô tả chi tiết về khóa học..."
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Danh mục
              </label>
              <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <option>Lập trình</option>
                <option>Thiết kế</option>
                <option>Marketing</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Cấp độ</label>
              <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <option>Cơ bản</option>
                <option>Nâng cao</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Giá (VND)</label>
            <input
              type="number"
              placeholder="1500000"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              URL ảnh đại diện
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>
      </div>

      {/* === Nội dung khóa học === */}
      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Nội dung khóa học</h2>
            <p className="text-sm text-gray-500">
              Thêm các bài giảng cho khóa học
            </p>
          </div>
          <button
            onClick={addLesson}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Thêm bài
          </button>
        </div>

        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="border rounded-xl p-5 mb-4 bg-gray-50 space-y-3"
          >
            <h3 className="text-sm font-medium mb-2">Bài {index + 1}</h3>

            <div>
              <label className="text-sm font-medium text-gray-700">Tiêu đề</label>
              <input
                type="text"
                placeholder="Tên bài giảng"
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Mô tả</label>
              <input
                type="text"
                placeholder="Mô tả ngắn"
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Video URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Thời lượng
                </label>
                <input
                  type="text"
                  placeholder="15:30"
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="px-5 py-2 rounded-md border text-gray-700 hover:bg-gray-100">
          Hủy
        </button>
        <button className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-800">
  Tạo khóa học
</button>

      </div>
    </div>
  );
}
