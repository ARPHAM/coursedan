"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";

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
    sections: [],
  });

  useEffect(() => {
    // 🧩 Giả lập dữ liệu khóa học ban đầu
    setCourse({
      title: "DevOps và Docker",
      description:
        "Tìm hiểu DevOps và containerization với Docker. Deploy ứng dụng hiệu quả.",
      category: "DevOps",
      level: "Nâng cao",
      price: "1800000",
      imageUrl: "/images/course.jpg",
      sections: [
        {
          id: 1,
          title: "Phần 1: Giới thiệu Docker",
          lectures: [
            {
              id: 1,
              title: "Tổng quan về Docker",
              description: "Container, image và các khái niệm cơ bản.",
              videoUrl: "https://example.com/docker-intro.mp4",
              duration: "10:20",
              isFree: true,
            },
            {
              id: 2,
              title: "Cài đặt Docker",
              description: "Hướng dẫn cài đặt trên Windows và Mac.",
              videoUrl: "https://example.com/install.mp4",
              duration: "15:00",
              isFree: true,
            },
          ],
        },
      ],
    });
  }, [id]);

  // 🧩 Cập nhật thông tin khóa học cơ bản
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCourse((prev: any) => ({ ...prev, [name]: value }));
  };

  // === Section handlers ===
  const addSection = () => {
    setCourse({
      ...course,
      sections: [
        ...course.sections,
        { id: Date.now(), title: "Phần mới", lectures: [] },
      ],
    });
  };

  const deleteSection = (sectionId: number) => {
    setCourse({
      ...course,
      sections: course.sections.filter((s: any) => s.id !== sectionId),
    });
  };

  const updateSectionTitle = (sectionId: number, title: string) => {
    setCourse({
      ...course,
      sections: course.sections.map((s: any) =>
        s.id === sectionId ? { ...s, title } : s
      ),
    });
  };

  // === Lecture handlers ===
  const addLecture = (sectionId: number) => {
    setCourse({
      ...course,
      sections: course.sections.map((s: any) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: [
                ...s.lectures,
                {
                  id: Date.now(),
                  title: "",
                  description: "",
                  videoUrl: "",
                  duration: "",
                  isFree: false,
                },
              ],
            }
          : s
      ),
    });
  };

  const deleteLecture = (sectionId: number, lectureId: number) => {
    setCourse({
      ...course,
      sections: course.sections.map((s: any) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: s.lectures.filter((l: any) => l.id !== lectureId),
            }
          : s
      ),
    });
  };

  const updateLecture = (
    sectionId: number,
    lectureId: number,
    field: string,
    value: string | boolean
  ) => {
    setCourse({
      ...course,
      sections: course.sections.map((s: any) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: s.lectures.map((l: any) =>
                l.id === lectureId ? { ...l, [field]: value } : l
              ),
            }
          : s
      ),
    });
  };

  // 🧩 Gửi lưu dữ liệu
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Cập nhật khóa học:", course);
    alert("✅ Đã lưu thay đổi khóa học!");
    router.push("/teach");
  };

  // === Render ===
  return (
    <div className="max-w-5xl mx-auto p-6">
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
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-1">Thông tin cơ bản</h2>
          <p className="text-sm text-gray-500 mb-5">
            Cập nhật thông tin tổng quan khóa học
          </p>

          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              placeholder="Tên khóa học"
              className="w-full border rounded-lg px-3 py-2"
            />
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              rows={3}
              placeholder="Mô tả khóa học"
              className="w-full border rounded-lg px-3 py-2 resize-none"
            />
            <input
              type="text"
              name="imageUrl"
              value={course.imageUrl}
              onChange={handleChange}
              placeholder="URL ảnh đại diện"
              className="w-full border rounded-lg px-3 py-2"
            />
            {course.imageUrl && (
              <img
                src={course.imageUrl}
                alt="preview"
                className="w-full h-48 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>

        {/* === Nội dung khóa học === */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Nội dung khóa học</h2>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <Plus size={16} /> Thêm phần
            </button>
          </div>

          {course.sections.map((section: any) => (
            <div key={section.id} className="border rounded-lg p-4 mb-5 bg-gray-50">
              {/* Tiêu đề section */}
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    updateSectionTitle(section.id, e.target.value)
                  }
                  className="font-medium text-gray-800 w-full border-b px-2 py-1 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => deleteSection(section.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Danh sách bài giảng */}
              {section.lectures.map((lecture: any) => (
                <div
                  key={lecture.id}
                  className="bg-white border rounded-lg p-3 mb-2"
                >
                  <div className="flex justify-between items-start mb-2">
                    <input
                      type="text"
                      placeholder="Tiêu đề bài giảng"
                      value={lecture.title}
                      onChange={(e) =>
                        updateLecture(section.id, lecture.id, "title", e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2 mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => deleteLecture(section.id, lecture.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <textarea
                    placeholder="Mô tả ngắn"
                    value={lecture.description}
                    onChange={(e) =>
                      updateLecture(section.id, lecture.id, "description", e.target.value)
                    }
                    className="w-full border rounded-lg px-3 py-2 mb-2"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={lecture.videoUrl}
                      onChange={(e) =>
                        updateLecture(section.id, lecture.id, "videoUrl", e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Thời lượng (vd: 05:20)"
                      value={lecture.duration}
                      onChange={(e) =>
                        updateLecture(section.id, lecture.id, "duration", e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>

                  <label className="mt-2 flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={lecture.isFree}
                      onChange={(e) =>
                        updateLecture(section.id, lecture.id, "isFree", e.target.checked)
                      }
                      className="mr-2"
                    />
                    Học miễn phí
                  </label>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addLecture(section.id)}
                className="mt-2 flex items-center gap-1 text-sm text-gray-600 hover:text-black"
              >
                <Plus size={14} /> Thêm bài giảng
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2 border rounded-md hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
