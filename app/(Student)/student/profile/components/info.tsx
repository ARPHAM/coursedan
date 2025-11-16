"use client";
import { useState } from "react";
import { useInfoStudent } from "../_api/queries";

export default function TabInfo() {
  const [name, setName] = useState<string | null>(null);
  const [gmail, setGmail] = useState<string | null>(null);
  const infoStudent = useInfoStudent();

  if (infoStudent.isSuccess)
    return (
      <main className="flex-1 px-10 py-8">
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-2xl font-bold text-[#0a092d] mb-1">
            Thông tin cá nhân
          </h1>
          <p className="text-gray-500 text-sm">
            Thêm thông tin về bản thân bạn
          </p>
        </div>

        <form className="space-y-8 max-w-2xl mx-auto">
          {/* ======= THÔNG TIN CƠ BẢN ======= */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-3 text-base">
              Thông tin cơ bản:
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                value={name === null ? infoStudent.data.fullName : name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0a092d]/70 transition text-gray-800"
              />
            </div>
          </div>

          {/* ======= ĐƯỜNG LIÊN KẾT ======= */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-3 text-base">
              Đường liên kết:
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#0a092d]/70">
                  <span className="bg-gray-100 text-gray-700 px-3 py-2.5 text-sm border-r border-gray-300">
                    Gmail.com/
                  </span>

                  <input
                    type="text"
                    placeholder="your@gmail.com"
                    value={gmail === null ? infoStudent.data.email : gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-sm text-gray-800 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="pt-6 text-center">
            <button
              type="submit"
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
    );
}
