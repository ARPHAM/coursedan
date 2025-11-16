"use client";
import Course from "@/components/course";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useMyCourses } from "./_api/queries";
import FilterByPage from "@/components/FilterByPage";
import { useQueryState } from "nuqs";

export default function Page() {
  const page = Number(useQueryState("page")[0]);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    function getLimit() {
      const w = window.innerWidth;
      return Math.max(Math.floor((w - 24) / 224) * 2, 6);
    }

    setLimit(getLimit());

    const handleResize = () => setLimit(getLimit());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const courses = useMyCourses({ limit, page });
  console.log(limit);
  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl mb-6 text-gray-800 pb-4">
        <Link href="/" className="bg-gray-200 p-4">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        Khóa học của tôi
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {courses.isError && <>Error</>}
        {courses.data && courses.data.items.length ? (
          <>
            {courses.data.items.map((course) => (
              <Course key={course.courseId} data={course} learn />
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
