"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpenCheck, GraduationCap } from "lucide-react";
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
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
          <Link
            href="/"
            className="text-2xl font-extrabold text-blue-600 tracking-tight"
          >
            Coursedan
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                pathname === item.href
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Admin Info */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 font-medium">Admin User</span>
          <Image
            src="/images/avatar-placeholder.png"
            alt="Admin"
            width={40}
            height={40}
            className="rounded-full border border-gray-300"
          />
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
