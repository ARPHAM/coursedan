"use client";

import { useParams } from "next/navigation";
import { useCourse } from "../_api/queries";

export default function Video({
  urlVid,
  className,
}: {
  urlVid: string;
  className: string;
}) {
  const params = useParams();
  const id = String(params.id);
  const course = useCourse(id);
  if (course.data)
    return (
      <div className={`aspect-video overflow-hidden shadow-lg ${className}`}>
        <iframe
          className="w-full h-full"
          src={course.data.urlVid}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
}
