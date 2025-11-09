"use client";

import { useState } from "react";
import { Plus, ArrowLeft, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const [sections, setSections] = useState([
    {
      title: "Phần 1: Giới thiệu",
      isOpen: true,
      lectures: [
        { title: "", description: "", videoUrl: "", duration: "", isFree: false },
      ],
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      { title: `Phần ${sections.length + 1}`, isOpen: true, lectures: [] },
    ]);
  };

  const addLecture = (sectionIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].lectures.push({
      title: "",
      description: "",
      videoUrl: "",
      duration: "",
      isFree: false,
    });
    setSections(updated);
  };

  const toggleSection = (index: number) => {
    const updated = [...sections];
    updated[index].isOpen = !updated[index].isOpen;
    setSections(updated);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const removeLecture = (sectionIndex: number, lectureIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].lectures.splice(lectureIndex, 1);
    setSections(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      {/* 🔙 Quay lại */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-700">
        <ArrowLeft className="w-4 h-4" />
        <Link href="/teach/dashboard" className="hover:underline">
          Quay lại
        </Link>
      </div>

      {/* 🧾 Tiêu đề */}
      <h1 className="text-2xl font-semibold mb-8">Tạo khóa học mới</h1>

      {/* === Thông tin cơ bản === */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border">
        <h2 className="text-lg font-semibold mb-1">Thông tin cơ bản</h2>
        <p className="text-sm text-gray-500 mb-4">
          Điền thông tin cơ bản về khóa học của bạn
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tên khóa học"
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50"
          />
          <textarea
            placeholder="Mô tả chi tiết về khóa học..."
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50"
            rows={2}
          />
          <input
            type="number"
            placeholder="Giá (VND)"
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50"
          />
          <input
            type="url"
            placeholder="URL ảnh đại diện"
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50"
          />
        </div>
      </div>

      {/* === Nội dung khóa học === */}
      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Nội dung khóa học</h2>
          <button
            onClick={addSection}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Thêm phần
          </button>
        </div>

        {sections.map((section, sIndex) => (
          <div key={sIndex} className="border rounded-xl mb-4 bg-gray-50">
            {/* Section header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleSection(sIndex)}
            >
              <div className="font-medium text-gray-800 flex items-center gap-2">
                {section.isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    const updated = [...sections];
                    updated[sIndex].title = e.target.value;
                    setSections(updated);
                  }}
                  className="border-none bg-transparent focus:ring-0 w-full text-sm"
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSection(sIndex);
                }}
              >
                <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
              </button>
            </div>

            {/* Lectures list */}
            {section.isOpen && (
              <div className="p-4 space-y-4 border-t bg-white">
                {section.lectures.map((lecture, lIndex) => (
                  <div
                    key={lIndex}
                    className="border rounded-lg p-4 bg-gray-50 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">
                        Bài {lIndex + 1}
                      </h4>
                      <button
                        onClick={() => removeLecture(sIndex, lIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Tiêu đề bài giảng"
                      className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                      value={lecture.title}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[sIndex].lectures[lIndex].title =
                          e.target.value;
                        setSections(updated);
                      }}
                    />

                    <input
                      type="text"
                      placeholder="Mô tả ngắn"
                      className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                      value={lecture.description}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[sIndex].lectures[lIndex].description =
                          e.target.value;
                        setSections(updated);
                      }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="url"
                        placeholder="Video URL"
                        className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                        value={lecture.videoUrl}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[sIndex].lectures[lIndex].videoUrl =
                            e.target.value;
                          setSections(updated);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Thời lượng (phút)"
                        className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                        value={lecture.duration}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[sIndex].lectures[lIndex].duration =
                            e.target.value;
                          setSections(updated);
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={lecture.isFree}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[sIndex].lectures[lIndex].isFree =
                            e.target.checked;
                          setSections(updated);
                        }}
                      />
                      <span className="text-sm text-gray-700">
                        Cho phép học thử (free)
                      </span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addLecture(sIndex)}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <Plus className="w-4 h-4" /> Thêm bài giảng
                </button>
              </div>
            )}
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
