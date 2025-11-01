// app/components/header.tsx (Tạo file mới)
"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, Bell } from "lucide-react";

export default function Header() {
  // Bạn có thể thay đổi biến này (ví dụ: khi người dùng đăng nhập)
  const isLoggedIn = false; 

  return (
    <header className="bg-white shadow-md w-full px-4 sm:px-6 py-4">
      <div className="max-w-full mx-auto flex items-center justify-between gap-4">
        
        {/* === BÊN TRÁI: Logo & Khám phá === */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            coursedan
          </Link>
          <Link href="/categories" className="text-sm text-gray-700 hover:text-purple-600 hidden md:block">
            Khám phá
          </Link>
        </div>

        {/* === GIỮA: Thanh tìm kiếm === */}
        <div className="grow max-w-xl relative hidden sm:block">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm nội dung bất kỳ"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full bg-gray-50 focus:border-purple-500 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* === BÊN PHẢI: Icons & Nút bấm === */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/business" className="text-sm text-gray-700 hover:text-purple-600 hidden lg:block">
            Doanh nghiệp
          </Link>
          <Link href="/teach" className="text-sm text-gray-700 hover:text-purple-600 hidden lg:block">
            Giảng dạy
          </Link>

          <Link href="/cart" className="hover:text-purple-600 p-1">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          
          {/* Hiển thị khác nhau tùy theo đã đăng nhập hay chưa
          */}
          {isLoggedIn ? (
            <>
              <Link href="/wishlist" className="hover:text-purple-600 p-1 hidden sm:block">
                <Heart className="w-6 h-6" />
              </Link>
              <Link href="/notifications" className="hover:text-purple-600 p-1 hidden sm:block">
                <Bell className="w-6 h-6" />
              </Link>
              {/* Avatar người dùng */}
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold cursor-pointer">
                HA
              </div>
            </>
          ) : (
            <>
              {/* Hiện Nút Đăng nhập/Đăng ký */}
              <Link href="/Login" className="px-4 py-2 border border-gray-800 rounded-md text-sm font-bold text-gray-800 hover:bg-gray-50">
                Đăng nhập
              </Link>
              <Link href="/register" className="px-4 py-2 bg-gray-800 border border-gray-800 rounded-md text-sm font-bold text-white hover:bg-gray-700 hidden sm:block">
                Đăng ký
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}