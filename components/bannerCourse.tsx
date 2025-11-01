"use client";

import { Rate } from "antd";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BannerCourse({ className }: { className?: string }) {
  const [value, setValue] = useState(2.5);
  return (
    <div
      className={`bg-gray-200 text-gray-900 p-4 rounded-lg w-[300px] flex flex-col ${className}`}
    >
      <Image //
        src="https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg"
        alt="Course Banner"
        width={300}
        height={150}
        className="object-cover rounded-md"
      />
      <div className="mt-4">
        <p className="font-bold">
          Learn Next.js with our comprehensive course!
        </p>
        <p className="mt-2 text-sm">
          Dive deep into Next.js and build amazing web applications with
          hands-on projects and expert guidance.
        </p>
        <div className="mt-2 flex gap-2">
          <p className="text-[20px]">{value}</p>
          <Rate allowHalf defaultValue={value} onChange={setValue} />
        </div>
        <Link href="/enroll" className="mt-4 text-blue-500 hover:underline">
          Enroll Now
        </Link>
      </div>
    </div>
  );
}
