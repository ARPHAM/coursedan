"use client";

import { useParams } from "next/navigation";
import { useCourse } from "../_api/queries";

export default function Comment() {
  const params = useParams();
  const id = String(params.id);
  const course = useCourse(id);
  if (course.data)
    return (
      <>
        {course.data.comment.map((comment) => {
          <h1>{comment.content}</h1>;
          {
            comment.reply.map((reply) => {
              <h2>{reply.content}</h2>;
            });
          }
        })}
      </>
    );
}
