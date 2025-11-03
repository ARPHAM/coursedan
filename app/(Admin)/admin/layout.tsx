"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpenCheck, GraduationCap, LogOut } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Yêu cầu GV", href: "/admin/teachers", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Duyệt khóa học", href: "/admin/courses", icon: <BookOpenCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* --- Header --- */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={28} height={28} />
          <Link href="/" className="text-2xl font-bold text-#0a092d">
            coursedan
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition ${
                pathname === item.href
                  ? "bg-[#0a092d] text-white"
                  : "text-gray-700 hover:bg-[#0a092d]/10 hover:text-[#0a092d]"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Admin User</span>
          <Image
            src="/images/avatar-placeholder.png"
            alt="Admin"
            width={36}
            height={36}
            className="rounded-full border border-gray-300"
          />
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
