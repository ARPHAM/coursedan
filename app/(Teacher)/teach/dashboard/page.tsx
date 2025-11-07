"use client";

import { BookOpen, Users, DollarSign, Clock } from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Dashboard
      </h1>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-2 mb-6 text-sm">
        📢 Bạn có <strong>1 khóa học</strong> đang chờ duyệt
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-sm rounded-xl p-5 border">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm font-medium">Tổng khóa học</p>
            <BookOpen className="text-gray-400 w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold mt-2">4</h3>
          <p className="text-sm text-gray-500 mt-1">3 đã xuất bản</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 border">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm font-medium">Chờ duyệt</p>
            <Clock className="text-gray-400 w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold mt-2">1</h3>
          <p className="text-sm text-gray-500 mt-1">Khóa học chờ kiểm duyệt</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 border">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm font-medium">Học viên</p>
            <Users className="text-gray-400 w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold mt-2">0</h3>
          <p className="text-sm text-gray-500 mt-1">Tổng học viên đăng ký</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 border">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm font-medium">Doanh thu</p>
            <DollarSign className="text-gray-400 w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold mt-2">0đ</h3>
          <p className="text-sm text-gray-500 mt-1">Tổng doanh thu</p>
        </div>
      </div>
    </div>
  );
}
