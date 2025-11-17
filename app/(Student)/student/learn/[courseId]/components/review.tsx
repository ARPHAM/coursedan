"use client";
import { useCourse } from "../_api/queries";
import Rate from "@/components/ui/rate";
import { useParams } from "next/navigation";

export default function Review() {
  const courseId = useParams().couresId[0];
  const course = useCourse(courseId);

  if (!course.data) return null;
  return (
    <div className="flex mt-2 gap-3">
      <div className="flex flex-col w-70 gap-2 bg-gray-200 p-4">
        {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
          <div key={num} className="flex gap-3">
            <Rate value={num - 1} sizeStar="20px" className="w-50" />
            <div className="my-auto">{course.data.rating[num - 1]}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-gray-100 w-full p-4 gap-3">
        <div className="flex gap-4">
          <div className="flex rounded-full w-10 h-10 bg-amber-400">
            <div className="m-auto">T</div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="font-bold">{"Tran Viet Anh"}</div>
            <Rate value={5} />
          </div>
        </div>
        <div className="text-[16px]">{"Haizz"}</div>
      </div>
    </div>
  );
}
