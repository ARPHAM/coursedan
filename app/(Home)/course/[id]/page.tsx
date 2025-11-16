"use client";
import { Rate } from "antd";
import { useState } from "react";
import { useCourseInfo } from "./_api/queries";
import { useParams } from "next/navigation";

export default function CourseDetailPage() {
  const params = useParams();
  const id = String(params.id);
  const courseInfo = useCourseInfo(id);
  if (courseInfo.data)
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <section className="bg-gray-900 text-white py-10 px-6 flex flex-col md:flex-row justify-center gap-10">
          <div className="max-w-2xl flex flex-col gap-4">
            <h1 className="text-4xl font-bold leading-tight">
              {courseInfo.data.title}
            </h1>
            <p className="text-gray-300 text-lg">
              {courseInfo.data.description}
            </p>
            <div className="mt-1 flex items-center gap-2 text-yellow-500">
              <div className="text-sm font-medium">
                {courseInfo.data.rating || 5}
              </div>
              <Rate value={Number(courseInfo.data.rating || 5)} />
              <span className="text-sm text-gray-400">
                ({courseInfo.data.numberOfRating} lượt đánh giá)
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Tạo bởi{" "}
              <span className="text-white font-semibold">
                {courseInfo.data.instructor}
              </span>
            </p>
          </div>

          <div className="w-full md:w-[320px]">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <img
                src={
                  courseInfo.data.imageUrl
                    ? courseInfo.data.imageUrl
                    : "https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg"
                }
                alt="Course preview"
                className="w-full h-[180px] object-cover"
              />
              <div className="p-4 flex flex-col gap-3">
                <div className="text-3xl font-bold text-black">
                  {courseInfo.data.price} VND
                </div>
                {courseInfo.data.bought ? (
                  <>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
                      Học ngay
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-red-500 font-medium">
                      Còn 5 phút giảm giá!
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
                      Thêm vào giỏ hàng
                    </button>
                    <button className="w-full border border-blue-600 text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-50 transition">
                      Mua ngay
                    </button>
                    <p className="text-sm text-gray-500 text-center">
                      Đảm bảo hoàn tiền trong 30 ngày
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}
