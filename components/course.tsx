"use client";

import Rate from "@/components/ui/rate";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Money from "./money";

export default function Course({
  className,
  url,
}: {
  className?: string;
  url?: string;
}) {
  const [value, setValue] = useState(4.5);

  return (
    <div
      className={`bg-white text-gray-900 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-[200px] flex flex-col ${className}`}
    >
      <div className="relative h-[150px] w-full overflow-hidden rounded-lg">
        <Image
          src="https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg"
          alt="Course Banner"
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="font-semibold text-[20px] leading-snug text-gray-800 line-clamp-2">
          Learn Next.js with our comprehensive course!
        </div>

        <div className="text-[12px] text-gray-600 line-clamp-3 mt-1">
          Dive deep into Next.js and build amazing web applications with
          hands-on projects and expert guidance.
        </div>

        <div className="mt-1 flex items-center gap-2 text-yellow-500">
          <div className="text-sm font-medium">{value}</div>
          <Rate value={value} />
        </div>

        {url ? (
          <Link
            href={`/student/learn/${url}`}
            className="mt-auto inline-block bg-blue-600 text-white text-center text-sm font-semibold px-1 py-2 rounded-[4px] hover:bg-blue-700 transition-colors duration-200"
          >
            Học ngay
          </Link>
        ) : (
          <>
            <Money amount={49_990} className="text-[14px] my-1 font-bold" />
            <Link
              href="/course/lap-trinh-web/1"
              className="mt-auto inline-block bg-blue-600 text-white text-center text-sm font-semibold px-1 py-2 rounded-[4px] hover:bg-blue-700 transition-colors duration-200"
            >
              Thêm vào giỏ hàng
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
