"use client";

import { BookOpen, Users, DollarSign, Clock } from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* === Navbar === */}
      <header className="flex justify-between items-center bg-white shadow-sm px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md"></div>
          <Link href="/" className="text-2xl font-bold text-purple-600">
            coursedan
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-gray-900 bg-gray-200 px-3 py-1.5 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Khóa học của tôi
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">John Instructor</span>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 8.75V14.16c0 .538-.214 1.055-.595 1.435L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* === Main Content === */}
      <main className="px-8 py-6">
        <h1 className="text-xl font-semibold mb-2 text-gray-800">
          Dashboard Giảng viên
        </h1>

        {/* Notification */}
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-2 mb-6 text-sm">
          📢 Bạn có <strong>1 khóa học</strong> đang chờ duyệt
        </div>

        {/* Action button */}
        <div className="flex justify-end mb-6">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Tạo khóa học mới
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm font-medium">Tổng khóa học</p>
              <BookOpen className="text-gray-400 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold mt-2">4</h3>
            <p className="text-sm text-gray-500 mt-1">3 đã xuất bản</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm font-medium">Chờ duyệt</p>
              <Clock className="text-gray-400 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold mt-2">1</h3>
            <p className="text-sm text-gray-500 mt-1">Khóa học chờ kiểm duyệt</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm font-medium">Học viên</p>
              <Users className="text-gray-400 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold mt-2">0</h3>
            <p className="text-sm text-gray-500 mt-1">Tổng học viên đăng ký</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm font-medium">Doanh thu</p>
              <DollarSign className="text-gray-400 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold mt-2">0đ</h3>
            <p className="text-sm text-gray-500 mt-1">Tổng doanh thu</p>
          </div>
        </div>
      </main>
    </div>
  );
}
