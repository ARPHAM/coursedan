"use client";

import { useEffect, useState } from "react";
import SectionCourse from "./components/sections";
import Video from "./components/vid";
import Information from "./components/information";
import Comment from "./components/comment";
import Review from "./components/review";
import { useParams } from "next/navigation";
import { useCourse, useSection } from "./_api/queries";
import { useQueryState } from "nuqs";

export default function Page() {
  const params = useParams();
  const courseId = String(params.courseId);
  const [lectureId, setLectureId] = useQueryState("Lecture");

  const [tab, setTab] = useState<"info" | "comment" | "review">("info");
  const sections = useSection(courseId);

  useEffect(() => {
    if (!lectureId && sections.data) {
      setLectureId(String(sections.data[0].lectures[0].id));
    }
  }, [lectureId, sections.data, setLectureId]);
  const course = useCourse(lectureId);
  if (course.data)
    return (
      <div className="flex-1 p-4 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-stretch min-h-0">
          <div className="w-full md:w-2/3">
            <div className="w-full aspect-video">
              {course.data?.urlVid ? (
                <Video urlVid={course.data.urlVid} className="w-full h-full" />
              ) : (
                <Video
                  urlVid="https://www.youtube.com/embed/-jV06pqjUUc?si=HMbpnUd7da03v39Q"
                  className="w-full h-full"
                />
              )}
            </div>
          </div>

          <div className="w-full border-l md:w-1/3 flex flex-col md:overflow-y-auto bg-amber-100 ">
            <div className="w-full md:h-0">
              <SectionCourse />
            </div>
          </div>
        </div>

        <div>
          <div className="flex gap-4 font-bold text-[20px] pt-4 pb-2 pl-4 bg-gray-300">
            <div
              className={`${
                tab === "info" ? "border-b-gray-900 border-b-4" : ""
              }`}
              onClick={() => setTab("info")}
            >
              Information
            </div>
            <div
              className={`${
                tab === "comment" ? "border-b-gray-900 border-b-4" : ""
              }`}
              onClick={() => setTab("comment")}
            >
              Comment
            </div>
            <div
              className={`${
                tab === "review" ? "border-b-gray-900 border-b-4" : ""
              }`}
              onClick={() => setTab("review")}
            >
              Review
            </div>
          </div>

          {tab === "info" && <Information />}
          {tab === "comment" && <Comment />}
          {tab === "review" && <Review />}
        </div>
      </div>
    );
}
