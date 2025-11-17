"use client";

import { useParams } from "next/navigation";
import { useCourse, useLecture } from "../_api/queries";
import { useQueryState } from "nuqs";
import { data } from "autoprefixer";

export default function Video({
  className,
}: {
  urlVid: string;
  className: string;
}) {
  const lectureId = useQueryState("Lecture")[0];
  const courseId = String(useParams().couresId);
  console.log(courseId);
  const lecture = useLecture({ courseId, lectureId });
  if (lecture.data)
    return (
      <div className={`aspect-video overflow-hidden shadow-lg ${className}`}>
        <iframe
          className="w-full h-full"
          src={lecture.data.urlVid}
          title="YouTube video player"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
}
