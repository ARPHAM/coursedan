"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ShoppingCart, Search } from "lucide-react";

export default function TeachHeader() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3 gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
          <Link href="/" className="text-2xl font-bold text-purple-700">
            coursedan
          </Link>
        </div>

        {/* Ô tìm kiếm */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm nội dung bất kỳ"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/teach/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/teach" className="hover:text-blue-600">
            Khóa học của tôi
          </Link>
          <Link href="/teach/create" className="hover:text-blue-600">
            Tạo khóa học
          </Link>

          {/* Icons */}
          <button className="hover:text-blue-600">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hover:text-blue-600">
            <ShoppingCart className="w-5 h-5" />
          </button>

          {/* 👇 Nút người dùng */}
          <button
            onClick={() => router.push("/teach/profile")}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
          >
            John Instructor
          </button>
        </nav>
      </div>
    </header>
  );
}
