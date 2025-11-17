"use client";

import { useParams } from "next/navigation";
import { useCourse } from "../_api/queries";
import { useCourseInfo } from "@/app/(Home)/course/[courseId]/_api/queries";

export default function Information() {
  const params = useParams();
  const courseId = String(params.courseId);
  const course = useCourse(courseId);
  const infoCourse = useCourseInfo(courseId);
  if (course.data && infoCourse.data)
    return (
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-2">{course.data.courseTitle}</h1>
        <p className="text-gray-600 mb-4">{infoCourse.data.description}</p>

        <div className="flex items-center gap-3 border-t border-b py-4">
          <div
            children={
              <div className="m-auto">{course.data.instructor.name[0]}</div>
            }
            className="flex w-12 h-12 rounded-full bg-amber-200 text-center justify-center"
          />
          <div>
            <p className="font-semibold">{course.data.instructor.name}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {infoCourse.data.numberOfStudents} người đang học khóa này
            {course.data.instructor.bio}
            {course.data.instructor.title}
            {course.data.instructor.experience}
            {course.data.instructor.certificate}
          </p>
        </div>
      </div>
    );
}
