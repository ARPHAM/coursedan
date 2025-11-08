"use client";

import ProgressBar from "@/components/ProgressBar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const sections = [
    {
      id: 1,
      title: "Phần 1: Bắt đầu với React",
      totalLength: "06 bài giảng",
      totalDuration: "60 phút",
      lectures: [
        {
          id: 1,
          title: "Giới thiệu khóa học",
          duration: "05:32",
          process: 10,
        },
        {
          id: 2,
          title: "Cài đặt môi trường",
          duration: "08:15",
          process: 90,
        },
        { id: 3, title: "Cấu trúc dự án", duration: "10:42", process: 15 },
        {
          id: 4,
          title: "React Component cơ bản",
          duration: "12:20",
          process: 20,
        },
        { id: 5, title: "Props & State", duration: "09:58", process: 90 },
        {
          id: 6,
          title: "Xử lý sự kiện và hooks",
          duration: "14:01",
          process: 100,
        },
      ],
    },
    {
      id: 2,
      title: "Phần 2: Xây dựng ứng dụng React",
      totalLength: "04 bài giảng",
      totalDuration: "52 phút",
      lectures: [
        {
          id: 7,
          title: "Tạo ứng dụng React đầu tiên",
          duration: "12:45",
          process: 50,
        },
        {
          id: 8,
          title: "Quản lý trạng thái với Redux",
          duration: "15:30",
          process: 45,
        },
        {
          id: 9,
          title: "Routing trong React",
          duration: "10:15",
          process: 25,
        },
        {
          id: 10,
          title: "Tối ưu hiệu suất ứng dụng",
          duration: "14:00",
          process: 20,
        },
      ],
    },
  ];

  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (id: number) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 pl-4">
        <div className="aspect-video overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/-jV06pqjUUc?si=HMbpnUd7da03v39Q"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-2">Khóa học React cơ bản</h1>
          <p className="text-gray-600 mb-4">
            Học cách xây dựng ứng dụng React hiện đại từ con số 0 — dễ hiểu, dễ
            thực hành, dành cho người mới bắt đầu.
          </p>

          <div className="flex items-center gap-3 border-t border-b py-4">
            <img
              src="https://i.pravatar.cc/60?img=12"
              alt="Instructor avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Nguyễn Văn Code</p>
              <p className="text-sm text-gray-500">Giảng viên Frontend</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Mô tả bài học</h2>
            <p className="text-gray-700 leading-relaxed">
              Trong bài học này, bạn sẽ được giới thiệu tổng quan về React và
              cách cấu trúc một dự án React hiện đại...
            </p>
          </div>
        </div>
      </div>

      <div className="w-80 border-l bg-white p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Danh sách bài giảng</h2>

        <ul className="space-y-2">
          {sections.map((section) => {
            const isOpen = openSections.includes(section.id);

            return (
              <li key={section.id}>
                <div
                  className="flex justify-between items-center p-4 border rounded-lg cursor-pointer bg-gray-300 hover:bg-gray-400 transition"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {section.title}
                    </span>
                    <span className="text-xs text-gray-700 opacity-70">
                      {section.totalLength} • {section.totalDuration}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-800">
                    {isOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>

                <ul
                  className={`space-y-2 overflow-hidden transition-all duration-300 ${
                    isOpen ? "pt-2 max-h-[600px]" : "max-h-0"
                  }`}
                >
                  {section.lectures.map((lecture) => (
                    <li key={lecture.id} className="flex flex-col">
                      <div
                        className={`p-3 border ${
                          lecture.id.toString() === id
                            ? "bg-blue-100 hover:bg-blue-200"
                            : "hover:bg-gray-50"
                        } transition cursor-pointer flex justify-between`}
                      >
                        <span className="font-medium">{lecture.title}</span>
                        <span className="text-sm text-gray-500">
                          {lecture.duration}
                        </span>
                      </div>
                      <ProgressBar value={lecture.process} />
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
