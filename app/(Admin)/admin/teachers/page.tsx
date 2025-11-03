"use client";

import { Clock } from "lucide-react";

export default function TeacherRequestsPage() {
  const requests = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      reason:
        "Tôi có 5 năm kinh nghiệm giảng dạy lập trình và muốn chia sẻ kiến thức.",
      date: "1/3/2025",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tiêu đề chính */}
      <h1 className="text-2xl font-bold text-[#0a092d]">
        Yêu cầu trở thành Giảng viên
      </h1>

      {/* Tổng quan */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-[#0a092d]" />
        <p className="text-gray-700 text-sm">
          Có{" "}
          <span className="font-semibold text-[#0a092d]">
            {requests.length}
          </span>{" "}
          yêu cầu đang chờ xử lý
        </p>
      </div>

      {/* Bảng yêu cầu */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-base font-semibold text-[#0a092d] mb-4">
          Yêu cầu đang chờ duyệt
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Xem xét và phê duyệt các yêu cầu trở thành giảng viên
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600 text-sm">
                <th className="py-2">Họ tên</th>
                <th>Email</th>
                <th>Lý do</th>
                <th>Ngày gửi</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-gray-50 text-sm transition"
                >
                  <td className="py-3 font-medium text-gray-800">{req.name}</td>
                  <td className="text-gray-700">{req.email}</td>
                  <td className="max-w-md text-gray-600">{req.reason}</td>
                  <td className="text-gray-600">{req.date}</td>
                  <td className="text-center">
                    <button className="bg-[#00A651] hover:bg-[#009245] text-black font-medium px-4 py-1.5 rounded-md text-sm mr-2 transition">
                      Duyệt
                    </button>
                    <button className="bg-[#E60000] hover:bg-[#CC0000] text-black font-medium px-4 py-1.5 rounded-md text-sm transition">
                      Từ chối
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
