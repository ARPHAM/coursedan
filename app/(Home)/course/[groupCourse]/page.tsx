"use client";

import Course from "@/components/course";
import { useParams } from "next/navigation";

export default function CourseGroupPage() {
  const params = useParams();
  const courseGroup = params?.groupCourse;

  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl mb-6 text-gray-800">
        Khóa học {courseGroup}
      </h1>

      <div
        className="
          flex flex-wrap gap-6 justify-center
          sm:justify-start
        "
      >
        <Course />
        <Course />
        <Course />
      </div>
    </div>
  );
}
