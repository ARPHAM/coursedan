"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Chrome, Facebook, Apple, User } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full bg-white">
        
        {/* === CỘT TRÁI (HÌNH ẢNH) === */}
       <div className="hidden lg:block lg:w-1/2 relative h-96 lg:h-auto">
                <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
              alt="Register Illustration"
              fill
              className="object-cover"
              priority
      />
        </div>

        {/* === CỘT PHẢI (FORM ĐĂNG KÝ) === */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Đăng ký tài khoản mới</h1>
          
          <form className="flex flex-col gap-4">
            
            {/* --- Tên đầy đủ --- */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Tên đầy đủ
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Nhập tên của bạn"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  required
                />
              </div>
            </div>

            {/* --- Email --- */}
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  required
                />
              </div>
            </div>

            {/* --- Password --- */}
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  required
                />
              </div>
            </div>

            {/* --- Checkbox --- */}
            <div className="flex items-start mt-2">
              <input
                id="marketing"
                name="marketing"
                type="checkbox"
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
              />
              <label htmlFor="marketing" className="ml-3 text-sm text-gray-600">
                Gửi cho tôi các ưu đãi đặc biệt, đề xuất khóa học và lời khuyên học tập.
              </label>
            </div>

            {/* --- Nút Đăng ký --- */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md font-bold text-lg 
              hover:bg-purple-700 transition duration-300 mt-4"
            >
              Đăng ký
            </button>
          </form>

          {/* --- Điều khoản --- */}
          <p className="mt-4 text-xs text-gray-500 text-center">
            Bằng việc đăng ký, bạn đồng ý với{" "}
            <Link href="/dieu-khoan" className="text-purple-600 hover:underline ml-1">
              Điều khoản sử dụng
            </Link>{" "}
            và{" "}
            <Link href="/chinh-sach-rieng-tu" className="text-purple-600 hover:underline ml-1">
              Chính sách quyền riêng tư
            </Link>.
          </p>

          {/* --- Divider --- */}
          <div className="my-6 flex items-center justify-center">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="px-3 text-sm text-gray-500 bg-white -mt-px">hoặc đăng ký bằng</span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>

          {/* --- Social Login --- */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 
            rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Chrome className="h-5 w-5 text-red-500" /> Tiếp tục với Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 
            rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Facebook className="h-5 w-5 text-blue-600" /> Tiếp tục với Facebook
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 
            rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Apple className="h-5 w-5" /> Tiếp tục với Apple
            </button>
          </div>

          {/* --- Link Đăng nhập --- */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Link href="/login" className="font-medium text-purple-600 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>

)}