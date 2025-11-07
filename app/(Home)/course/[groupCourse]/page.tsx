"use client";

import Course from "@/components/course";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseGroupPage() {
  const params = useParams();
  const courseGroup = params?.groupCourse;

  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl mb-6 text-gray-800 pb-4">
        <Link href="/" className="bg-gray-300 p-4 rounded-[10px]">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
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
