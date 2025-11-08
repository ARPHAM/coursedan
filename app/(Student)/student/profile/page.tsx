"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [language, setLanguage] = useState("vi");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-6">
      <div className="w-full max-w-6xl bg-white shadow-sm border border-gray-200 rounded-md flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 p-6 bg-white">
          {/* Avatar */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-[#0a092d] text-white flex items-center justify-center text-3xl font-bold">
              HA
            </div>
            <h2 className="mt-3 font-semibold text-gray-900 text-sm">
              Hồ Thị Kim Anh
            </h2>
          </div>

          {/* Menu */}
          <nav className="space-y-1 text-sm">
            {[
              "Xem hồ sơ công khai",
              "Hồ sơ",
              "Ảnh",
              "Bảo mật tài khoản",
              "Thuê bao",
              "Phương thức thanh toán",
              "Quyền riêng tư",
              "Tùy chọn thông báo",
              "Ứng dụng API",
              "Đóng tài khoản",
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  item === "Hồ sơ"
                    ? "bg-[#0a092d]/10 text-[#0a092d] font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-10 py-8">
          {/* Header */}
          <div className="text-center border-b pb-6 mb-6">
            <h1 className="text-2xl font-bold text-[#0a092d] mb-1">
              Hồ sơ công khai
            </h1>
            <p className="text-gray-500 text-sm">
              Thêm thông tin về bản thân bạn
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8 max-w-2xl mx-auto">
            {/* Basic Info */}
            <div>
              <h2 className="font-semibold text-gray-800 mb-3 text-base">
                Thông tin cơ bản:
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Họ"
                  defaultValue="Hồ Thị Kim"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0a092d]/70 transition text-gray-800"
                />
                <input
                  type="text"
                  placeholder="Tên"
                  defaultValue="Anh"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0a092d]/70 transition text-gray-800"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Đầu đề"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0a092d]/70 transition text-gray-800"
                  />
                  <span className="text-gray-500 text-sm">60</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Thêm dòng tiêu đề về nghề nghiệp, chẳng hạn như "Giảng viên tại Coursedan"
                  hoặc "Lập trình viên Web".
                </p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="font-semibold text-gray-800 mb-3 text-base">
                Tiểu sử
              </h2>
              <textarea
                placeholder="Giới thiệu ngắn về bản thân..."
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0a092d]/70 transition text-gray-800 resize-none"
              ></textarea>
              <p className="text-gray-500 text-sm mt-1">
                Không được phép sử dụng đường liên kết và mã coupon trong phần này.
              </p>
            </div>

            {/* Language */}
            <div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0a092d]/70 transition text-gray-800"
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Links */}
            <div>
              <h2 className="font-semibold text-gray-800 mb-3 text-base">
                Đường liên kết:
              </h2>
              <div className="space-y-4">
                {[
                  { domain: "Trang web (http(s)://...)", hint: "" },
                  { domain: "facebook.com/", hint: "Tên người dùng" },
                  { domain: "instagram.com/", hint: "Tên người dùng" },
                  { domain: "linkedin.com/", hint: "URL Hồ sơ công khai" },
                  { domain: "tiktok.com/", hint: "@Tên người dùng" },
                  { domain: "x.com/", hint: "Tên người dùng" },
                  { domain: "youtube.com/", hint: "Tên người dùng" },
                ].map((link, i) => (
                  <div key={i}>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#0a092d]/70">
                      <span className="bg-gray-100 text-gray-700 px-3 py-2.5 text-sm border-r border-gray-300">
                        {link.domain}
                      </span>
                      <input
                        type="text"
                        placeholder={link.hint}
                        className="flex-1 px-3 py-2.5 text-sm text-gray-800 outline-none"
                      />
                    </div>
                    {link.hint && (
                      <p className="text-gray-500 text-xs mt-1">
                        Nhập {link.hint.toLowerCase()} của bạn (ví dụ: johnsmith)
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Save button */}
            <div className="pt-6 text-center">
              <button
            type="submit"
            // inline để override vấn đề cascade; giữ cả class đẹp
            style={{ backgroundColor: "#0a092d", color: "#ffffff" }}
            className="
                font-semibold px-6 py-2.5 rounded-md
                hover:bg-[#1b1a3b]
                focus:ring-2 focus:ring-[#0a092d]/60
                transition-all shadow-sm hover:shadow-md active:scale-[0.98]
                inline-flex items-center justify-center
            "
            >
            <span className="relative z-10">Lưu thay đổi</span>
</button>

            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
