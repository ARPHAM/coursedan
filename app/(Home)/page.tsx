"use client";
import Link from "next/link";
import Image from "next/image";
import Course from "@/components/course";
import NavbarMain from "@/components/navbarMain";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useCourses } from "./_api/queries";
import FilterByPage from "@/components/FilterByPage";

export default function Home() {
  const page = Number(useQueryState("page")[0]);
  const search = useQueryState("search")[""];
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    function getLimit() {
      const w = Math.min(window.innerWidth, 1280);
      return Math.max(Math.floor((w - 8) / 216) * 2, 6);
    }

    setLimit(getLimit());

    const handleResize = () => setLimit(getLimit());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const courses = useCourses();

  useEffect(
    () => courses.mutate({ limit, page, search }),
    [limit, page, search]
  );
  if (courses.isSuccess) {
    return (
      <>
        <NavbarMain />
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">
            Chào mừng đến với Coursedan!
          </h1>

          <div className="relative w-full h-64 md:h-67 rounded-lg overflow-hidden">
            <Image
              src="/images/banner.png"
              alt="Banner khóa học"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                Khám phá khoá học tuyệt vời!
              </h1>
              <p className="text-lg md:text-xl">
                Cùng học, cùng phát triển mỗi ngày
              </p>
            </div>
          </div>

          <Link href="/Login" className="text-blue-500 hover:underline">
            Login
          </Link>
          <Link
            href="/testcolor"
            className="ml-4 text-blue-500 hover:underline"
          >
            TestColor
          </Link>
          <Link href="/profile" className="ml-4 text-blue-500 hover:underline">
            profile
          </Link>
          <Link href="/teach" className="ml-4 text-blue-500 hover:underline">
            Teach
          </Link>
          <Link
            href="/admin/courses"
            className="ml-4 text-blue-500 hover:underline"
          >
            Admin
          </Link>

          {/* <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"> */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            {courses.isError && <>Error</>}
            {courses.data.items.length ? (
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
        </div>{" "}
      </>
    );
  }
}
