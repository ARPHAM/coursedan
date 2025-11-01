import { Rate } from "antd";
import { useState } from "react";

export default function BannerCourse({ className }: { className?: string }) {
  const [value, setValue] = useState(2.5);
  return (
    <div
      className={`bg-gray-200 text-gray-900 p-4 rounded-lg w-[300px] flex flex-col ${className}`}
    >
      <img
        src="https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg"
        alt="Course Banner"
      />
      <div className="mt-4">
        <p className="font-bold">
          Learn Next.js with our comprehensive course!
        </p>
        <p className="mt-2 text-sm">
          Dive deep into Next.js and build amazing web applications with
          hands-on projects and expert guidance.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <p>{value}</p>
          <Rate allowHalf defaultValue={value} onChange={setValue} />
        </div>
        <a href="#" className="mt-4 text-blue-500 hover:underline">
          Enroll Now
        </a>
      </div>
    </div>
  );
}
