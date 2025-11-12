"use client";

import Rate from "@/components/ui/rate";
import Image from "next/image";
import Link from "next/link";
import Money from "./money";

export default function Course({
  className,
  learn,
  data,
}: {
  className?: string;
  learn?: boolean;
  data?: {
    courseId?: number;
    id?: number;
    title: string;
    imageUrl: string;
    description: string;
    instructor: string;
    rating: number;
    price: number;
    progressPercent?: number;
    status?: string;
  };
}) {
  return (
    <Link
      className={`bg-white text-gray-900 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-[200px] flex flex-col ${className}`}
      href={
        learn
          ? `/student/learn/${data?.courseId || data?.id || 0}`
          : `/course/${data?.courseId || data?.id || 0}`
      }
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
          {data?.title || "Learn Next.js with our comprehensive course!"}
        </div>

        <div className="text-[12px] text-gray-600 line-clamp-3 mt-1">
          {data?.description ||
            "Dive deep into Next.js and build amazing web applications with hands-on projects and expert guidance."}
        </div>

        <div className="mt-1 flex items-center gap-2 text-yellow-500">
          <div className="text-sm font-medium">{data?.rating || 5}</div>
          <Rate value={Number(data?.rating || 5)} />
        </div>
        <Money
          amount={data?.price || "Free"}
          className="text-[14px] my-1 font-bold"
        />
      </div>
    </Link>
  );
}
