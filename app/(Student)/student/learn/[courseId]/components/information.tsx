"use client";

import { useParams } from "next/navigation";
import { useCourseInfo } from "@/app/(Home)/course/[id]/_api/queries";

export default function Information() {
  const params = useParams();
  const courseId = String(params.courseId);
  const infoCourse = useCourseInfo(courseId);
  if (infoCourse.data)
    return (
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-2">{infoCourse.data.title}</h1>
        <p className="text-gray-600 mb-4">{infoCourse.data.description}</p>

        <div className="flex items-center gap-3 border-t border-b py-4">
          <div
            children={
              <div className="m-auto">{infoCourse.data.instructor[0]}</div>
            }
            className="flex w-12 h-12 rounded-full bg-amber-200 text-center justify-center"
          />
          <div>
            <p className="font-semibold">{infoCourse.data.instructor}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {infoCourse.data.numberOfStudents} người đang học khóa này
          </p>
        </div>
      </div>
    );
}
