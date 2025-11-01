// app/Login/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
// Cài đặt thư viện icon: npm install lucide-react
import { Mail, Lock, Chrome, Facebook, Apple } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full bg-white">
        {/* === CỘT BÊN TRÁI (HÌNH ẢNH) === */}
        <div className="hidden lg:block lg:w-1/2 relative">
          {/* Bạn có thể thay đổi src ảnh này */}
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Login Illustration"
            layout="fill"
            className="object-cover"
          />
        </div>

        {/* === CỘT BÊN PHẢI (FORM ĐĂNG NHẬP) === */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Đăng nhập</h1>
          <p className="text-gray-600 mb-8">Chào mừng bạn trở lại!</p>

          <form className="flex flex-col gap-4">
            {/* --- Email --- */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ban@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* --- Password --- */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <Link
                href="/forgot-password"
                className="text-xs text-purple-600 hover:underline text-right block mt-1"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* --- Nút Đăng nhập chính --- */}
            <Link href="/">
              <button
                type="button"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
              >
                Đăng nhập
              </button>
            </Link>
          </form>

          {/* --- Đường kẻ "hoặc" --- */}
          <div className="my-6 flex items-center justify-center">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="px-3 text-sm text-gray-500 bg-white -mt-px">
              hoặc
            </span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>

          {/* --- Nút Đăng nhập Mạng xã hội --- */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Chrome className="h-5 w-5 text-red-500" /> Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Facebook className="h-5 w-5 text-blue-600" /> Facebook
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Apple className="h-5 w-5" /> Apple
            </button>
          </div>

          {/* --- Link Đăng ký --- */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
