"use client";

import { Globe } from "lucide-react";
import Link from "next/link";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`bg-zinc-900 text-gray-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* --- Cột 1 --- */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Về chúng tôi
          </h3>
          <ul className="space-y-2 text-sm">
            {/* BƯỚC 2: Thay thế <a> bằng <Link> */}
            <li>
              <Link href="/Introduction" className="hover:underline">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/Career" className="hover:underline">
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link href="/Contact" className="hover:underline">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Cột 2 --- */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Hỗ trợ</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq" className="hover:underline">
                Câu hỏi thường gặp
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-bao-mat" className="hover:underline">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link href="/dieu-khoan" className="hover:underline">
                Điều khoản sử dụng
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Cột 3 --- */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Khóa học</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/khoa-hoc/lap-trinh-web" className="hover:underline">
                Lập trình web
              </Link>
            </li>
            <li>
              <Link
                href="/khoa-hoc/phan-tich-du-lieu"
                className="hover:underline"
              >
                Phân tích dữ liệu
              </Link>
            </li>
            <li>
              <Link href="/khoa-hoc/kinh-doanh-so" className="hover:underline">
                Kinh doanh số
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Cột 4 --- */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Kết nối</h3>
          <div className="flex items-center gap-3">
            <Globe className="text-blue-400" size={20} />
            {/* Thẻ <a> ở đây là HỢP LÝ vì nó link ra bên ngoài */}
            <a
              href="https://www.coursedan.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              www.coursedan.vn
            </a>
          </div>
        </div>
      </div>

      {/* --- Phần bản quyền --- */}
      <div className="border-t border-zinc-700 text-center py-4 text-xs text-gray-400">
        © 2025 Coursedan. All rights reserved.
      </div>
    </footer>
  );
}
