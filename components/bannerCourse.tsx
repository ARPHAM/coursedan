"use client";

import { Rate } from "antd";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Money from "./money";

export default function BannerCourse({ className }: { className?: string }) {
  const [value, setValue] = useState(4.5);

  return (
    <div
      className={`bg-white text-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-[300px] flex flex-col ${className}`}
    >
      {/* Hình course */}
      <div className="relative">
        <Image
          src="https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg"
          alt="Course Banner"
          width={300}
          height={160}
          className="object-cover w-full h-[160px] hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
          Hot 🔥
        </span>
      </div>

      {/* Nội dung */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-lg leading-snug text-gray-800 line-clamp-2">
          Learn Next.js with our comprehensive course!
        </h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          Dive deep into Next.js and build amazing web applications with
          hands-on projects and expert guidance.
        </p>

        <div className="mt-3 flex items-center gap-2">
          <Rate allowHalf value={value} onChange={setValue} />
          <p className="text-sm font-medium text-gray-700">({value})</p>
        </div>

        <div className="mt-3">
          <Money amount={49.99} />
        </div>

        <Link
          href="/course/lap-trinh-web/1"
          className="mt-4 inline-block bg-blue-600 text-white text-center text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}
