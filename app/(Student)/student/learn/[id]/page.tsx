"use client";

import { useEffect, useState } from "react";
import SectionCourse from "./components/sections";
import Video from "./components/vid";
import Information from "./components/information";
import Comment from "./components/comment";
import Review from "./components/review";
import { useParams } from "next/navigation";
import { useCourse } from "./_api/queries";

export default function Page() {
  // const id = String(useParams().id);
  // const course = useCourse(id);
  const [tab, setTab] = useState<"info" | "comment" | "review">("info");
  // useEffect(() => course.mutate(), [course.mutate]);
  // const lecture = {
  //   urlVid: "https://www.youtube.com/embed/-jV06pqjUUc?si=HMbpnUd7da03v39Q",
  //   // "[comment1[comment2] ]
  //   // (comment và trả lời comment)"
  //   // "rating[0star: 10; 1star: 11; ...
  //   // 5star: 100]"
  //   // review_rating
  //   // review_comment
  //   current_progress: 20,
  // };

  return (
    <div className="flex-1 pl-4 bg-gray-50">
      <div className="flex flex-col md:flex-row md:items-stretch min-h-0">
        <div className="w-full md:w-2/3">
          <div className="w-full aspect-video">
            {/* <Video urlVid={course.data.urlVid} className="w-full h-full" /> */}
            <Video
              urlVid="https://www.youtube.com/embed/-jV06pqjUUc?si=HMbpnUd7da03v39Q"
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="w-full border-l md:w-1/3 flex flex-col md:overflow-y-auto bg-white">
          <div className="w-full md:h-0">
            <SectionCourse />
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-2 font-bold text-[18px] mt-4">
          <div
            className={`${
              tab === "info" ? "border-b-gray-900 border-b-[4px]" : ""
            }`}
            onClick={() => setTab("info")}
          >
            Information
          </div>
          <div
            className={`${
              tab === "comment" ? "border-b-gray-900 border-b-[4px]" : ""
            }`}
            onClick={() => setTab("comment")}
          >
            Comment
          </div>
          <div
            className={`${
              tab === "review" ? "border-b-gray-900 border-b-[4px]" : ""
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
