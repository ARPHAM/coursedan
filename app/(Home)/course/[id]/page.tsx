"use client";
import { Rate } from "antd";
import { useState } from "react";
import { useCourseInfo } from "./_api/queries";
import { useParams } from "next/navigation";

export default function CourseDetailPage() {
  const params = useParams();
  const id = String(params.id);
  const courseInfo = useCourseInfo(id);
  const [value, setValue] = useState(4.5);
  console.log("id", id, "courseInfo:", courseInfo.data);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div>{courseInfo.data ? courseInfo.data.title : "No result"}</div>
      {/* <section className="bg-gray-900 text-white py-10 px-6 flex flex-col md:flex-row justify-center gap-10">
        <div className="max-w-2xl flex flex-col gap-4">
          <h1 className="text-4xl font-bold leading-tight">
            CompTIA A+ Core 2 (220-1002) Full Course & Practice Exam
          </h1>
          <p className="text-gray-300 text-lg">
            Pass the CompTIA A+ Core 2 (220-1002) Exam with help from a top
            expert in the field!
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xl">{value}</span>
            <Rate allowHalf value={value} onChange={setValue} />
            <span className="text-sm text-gray-400">(2,341 đánh giá)</span>
          </div>
          <p className="text-sm text-gray-400">
            Tạo bởi{" "}
            <span className="text-white font-semibold">Alex Johnson</span>
          </p>
          <p className="text-sm text-gray-400">
            Cập nhật lần cuối: 10/2025 • Ngôn ngữ: Tiếng Anh
          </p>
        </div>

        <div className="w-full md:w-[320px]">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <img
              src="https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg"
              alt="Course preview"
              className="w-full h-[180px] object-cover"
            />
            <div className="p-4 flex flex-col gap-3">
              <div className="text-3xl font-bold text-black">$200</div>
              <div className="text-red-500 font-medium">
                Còn 5 phút giảm giá!
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition">
                Thêm vào giỏ hàng
              </button>
              <button className="w-full border border-purple-600 text-purple-600 font-semibold py-2 rounded-md hover:bg-purple-50 transition">
                Mua ngay
              </button>
              <p className="text-sm text-gray-500 text-center">
                Đảm bảo hoàn tiền trong 30 ngày
              </p>

              <hr />
              <p className="font-bold text-black">Khóa học này bao gồm:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>12 giờ video theo yêu cầu</li>
                <li>Tài liệu học tập kèm theo</li>
                <li>Bài kiểm tra cuối khóa</li>
                <li>Chứng chỉ hoàn thành</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <main className="max-w-5xl mx-auto p-6 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-6">
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h2 className="font-bold text-xl mb-2">
              Luyện thi chứng chỉ của bạn với khóa học này
            </h2>
            <div className="flex items-center gap-4">
              <div className="bg-gray-600 w-20 h-20 rounded-full" />
              <p className="text-gray-600">
                Thực hành với các bài test mô phỏng thực tế để chuẩn bị cho kỳ
                thi chính thức.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="font-bold text-2xl mb-3">Mô tả khóa học</h2>
            <p className="text-gray-700 mb-3">
              Khóa học này cung cấp cho bạn kiến thức và kỹ năng cần thiết để
              vượt qua kỳ thi CompTIA A+ Core 2 (220-1002).
            </p>
            <p className="text-gray-700 mb-3">
              Bạn sẽ học về các chủ đề như hệ điều hành, bảo mật, khắc phục sự
              cố và các kỹ năng IT thực tế thông qua ví dụ minh họa và bài tập
              thực hành.
            </p>
            <p className="text-gray-700">
              Sau khi hoàn thành, bạn có thể tự tin ứng tuyển các vị trí kỹ
              thuật viên IT hoặc hỗ trợ hệ thống.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="font-bold text-2xl mb-3">Bạn sẽ học được gì</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside text-gray-700">
              <li>Hiểu cấu trúc hệ điều hành Windows</li>
              <li>Thực hành xử lý sự cố phần mềm</li>
              <li>Thiết lập môi trường mạng nhỏ</li>
              <li>Cấu hình bảo mật cơ bản</li>
              <li>Thực hành thi thử CompTIA</li>
              <li>Nhận chứng chỉ hoàn thành</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            <h2 className="font-bold text-2xl mb-4">
              Khám phá các khóa học liên quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "CompTIA A+ Core 1 (220-1001)",
                "CompTIA A+ Core 2 (220-1002)",
                "CompTIA Network+ (N10-007)",
                "CompTIA Security+ (SY0-601)",
              ].map((name) => (
                <div
                  key={name}
                  className="p-3 border rounded-lg hover:shadow-md transition cursor-pointer"
                >
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-gray-500">Xem chi tiết khóa học</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[300px] h-fit border border-gray-200 rounded-lg bg-white p-4">
          <h3 className="font-bold text-xl mb-3">Giảng viên</h3>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-gray-400 rounded-full" />
            <p className="font-semibold">Alex Johnson</p>
            <p className="text-sm text-gray-500">Senior IT Expert</p>
            <p className="text-center text-gray-600 text-sm mt-2">
              Giảng viên với hơn 10 năm kinh nghiệm trong lĩnh vực IT và đào tạo
              chứng chỉ CompTIA.
            </p>
          </div>
        </div>
      </main> */}
    </div>
  );
}
