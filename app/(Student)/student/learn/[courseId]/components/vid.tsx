"use client";

import { useParams } from "next/navigation";
import { useCourse } from "../_api/queries";
import { useQueryState } from "nuqs";
import { data } from "autoprefixer";

export default function Video({
  urlVid,
  className,
}: {
  urlVid: string;
  className: string;
}) {
  const [lectureId, setLectureId] = useQueryState("Lecture");
  const course = lectureId ? useCourse(lectureId) : { data: null };
  if (course.data)
    return (
      <div className={`aspect-video overflow-hidden shadow-lg ${className}`}>
        <iframe
          className="w-full h-full"
          src={course.data.urlVid}
          title="YouTube video player"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
}
