import { useState } from "react";

import ProgressBar from "@/components/ProgressBar";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SectionCourse({ className }: { className?: string }) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (id: number) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

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
  return (
    <div className={`bg-white p-4 overflow-y-auto ${className}`}>
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
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
  );
}
