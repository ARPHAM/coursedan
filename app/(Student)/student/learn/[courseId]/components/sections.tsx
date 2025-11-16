"use client";
import { useEffect, useState } from "react";

import ProgressBar from "@/components/ProgressBar";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSection } from "../_api/queries";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";

export default function SectionCourse({ className }: { className?: string }) {
  const route = useRouter();
  const params = useParams();
  const id = String(params.courseId);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [lectureId, setLectureId] = useQueryState("Lecture");
  const sections = useSection(id);
  const toggleSection = (id: number) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className={`p-4 overflow-y-auto ${className}`}>
      <h2 className="text-lg font-semibold mb-3">Danh sách bài giảng</h2>

      <ul className="space-y-2">
        {sections.data &&
          sections.data.map((section) => {
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
                          lecture.id.toString() === lectureId
                            ? "bg-blue-100 hover:bg-blue-200"
                            : "hover:bg-gray-50"
                        } transition cursor-pointer flex justify-between`}
                        onClick={() => setLectureId(lecture.id.toString())}
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
