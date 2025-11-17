"use client";
import { useEffect, useState } from "react";

import ProgressBar from "@/components/ProgressBar";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useQueryState } from "nuqs";
import { useSection } from "../_api/queries";

export default function SectionCourse({ className }: { className?: string }) {
  const params = useParams();
  const id = String(params.courseId);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [vid, setVid] = useState("");
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
                      {section.totalLectures} • {section.totalDuration}
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
                  {section.lectures.map((lecture) => {
                    const isPreview = lecture.isPreview;

                    return (
                      <li key={lecture.id} className="flex flex-col">
                        <div
                          className={`p-3 border transition flex justify-between
          ${
            isPreview
              ? "cursor-pointer hover:bg-gray-50"
              : "cursor-not-allowed opacity-40 select-none"
          }
        `}
                          onClick={() => {
                            if (isPreview) {
                              setVid(lecture.descriptionUrl);
                            }
                          }}
                        >
                          <span className="font-medium">{lecture.title}</span>
                          <span className="text-sm text-gray-500">
                            {lecture.duration}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
      {vid !== "" && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setVid("")}
        >
          <div
            className="bg-white rounded-lg p-2 shadow-xl max-w-[560px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full aspect-video rounded-lg"
              src={vid}
              title="YouTube video player"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
