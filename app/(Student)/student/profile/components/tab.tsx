"use client";
import { useState } from "react";
import TabInfo from "./info";
import InstructorProfilePage from "@/app/(Teacher)/teach/profile/page";
import ChangePasswordPage from "./changePassword";
import { useRouter } from "next/navigation";
type Tab = "info" | "registerToTeach" | "forgetPassword" | "logout";

export default function Tab() {
  const route = useRouter();
  const [tab, setTab] = useState<Tab>("info");

  const tabs = [
    ["Thông tin cá nhân", "info"],
    ["Đăng ký làm giảng viên", "registerToTeach"],
    ["Quên mật khẩu", "forgetPassword"],
    ["Đăng xuất", "logout"],
  ] as const;
  if (tab === "logout") {
    document.cookie =
      "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
    route.push("/Login");
  }
  return (
    <>
      <aside className="w-64 border-r border-gray-200 p-6 bg-white">
        <nav className="space-y-1 text-sm">
          {tabs.map(([label, value], index) => (
            <button
              key={index}
              className={`w-full text-left px-3 py-2 rounded-md transition ${
                value === tab
                  ? "bg-[#0a092d]/10 text-[#0a092d] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setTab(value)}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
      {tab === "info" && <TabInfo />}
      {tab === "registerToTeach" && <InstructorProfilePage />}
      {tab === "forgetPassword" && <ChangePasswordPage />}
    </>
  );
}
