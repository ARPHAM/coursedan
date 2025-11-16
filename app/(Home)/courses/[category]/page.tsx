"use client";

import Course from "@/components/course";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCourses } from "../../_api/queries";
import { useEffect } from "react";
import FilterByPage from "@/components/FilterByPage";

export default function CourseGroupPage() {
  const params = useParams();
  const category = params?.category
    ? decodeURIComponent(
        Array.isArray(params.category) ? params.category[0] : params.category
      )
    : "";
  const courses = useCourses();
  useEffect(() => courses.mutate({ category }), [category, courses.mutate]);
  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl mb-6 text-gray-800 pb-4">
        <Link href="/" className="bg-gray-200 p-4">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        Khóa học {category}
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {courses.isError && <>Error</>}
        {courses.isSuccess && courses.data.items.length ? (
          <>
            {courses.data.items.map((course) => (
              <Course key={course.id} data={course} />
            ))}
            <div className="flex w-full justify-end">
              <FilterByPage
                name="page"
                pageCount={courses.data?.totalPages || 1}
              />
            </div>
          </>
        ) : (
          <>No results</>
        )}
      </div>
    </div>
  );
}
