// app/Login/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Chrome, Facebook, Apple } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="flex flex-col lg:flex-row rounded-xl shadow-2xl overflow-hidden max-w-5xl w-full bg-white">
        
        {/* === CỘT TRÁI: HÌNH ẢNH (Chỉ hiện trên lg) === */}
        <div className="hidden lg:block lg:w-1/2 relative h-96 lg:h-auto">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            alt="Login Illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* === CỘT PHẢI: FORM ĐĂNG NHẬP === */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Đăng nhập
            </h1>
            <p className="text-gray-600 mb-8">Chào mừng bạn trở lại!</p>

            <form className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ban@email.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    required
                  />
                </div>
                <Link
                  href="/forgot-password"
                  className="block text-right text-xs text-purple-600 hover:underline mt-1.5"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Nút Đăng nhập */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
              >
                Đăng nhập
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">hoặc</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <Chrome className="h-5 w-5 text-red-500" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <Facebook className="h-5 w-5 text-blue-600" />
                Facebook
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <Apple className="h-5 w-5" />
                Apple
              </button>
            </div>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="font-semibold text-purple-600 hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}