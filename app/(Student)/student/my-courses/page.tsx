"use client";
import Course from "@/components/course";
import Link from "next/link";
import { useMyCourses } from "./_api/mutation";
import { useEffect } from "react";

export default function Page() {
  const courses = useMyCourses();
  useEffect(() => courses.mutate(), [courses.mutate]);
  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl mb-6 text-gray-800 pb-4">
        <Link href="/" className="bg-gray-200 p-4">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        Khóa học của tôi
      </h1>

      <div
        className="
          flex flex-wrap gap-6 justify-center
          sm:justify-start
        "
      >
        {courses.isError && <>Error</>}
        {courses.isSuccess &&
          courses.data.items.map((course) => (
            <Course key={course.courseId} data={course} learn />
          ))}
      </div>
    </div>
  );
}
