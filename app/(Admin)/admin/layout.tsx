"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BarChart3, BookOpenCheck, GraduationCap, Users } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [adminProfile, setAdminProfile] = useState<{
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: string;
    permissions: string[];
    lastLogin: string;
    avatar: string;
  } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        setProfileError(null);
        // Read token from cookie
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        // If no token, skip calling profile API to avoid noisy errors
        if (!accessToken) {
          setProfileError("Thiếu access token");
          setAdminProfile(null);
        } else {
          const res = await fetch("https://coursedan-api.onrender.com/api/admin/profile", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (!res.ok) {
            // Gracefully handle non-ok without throwing to avoid overlay disruptions
            setProfileError(`Không thể tải profile (HTTP ${res.status})`);
            setAdminProfile(null);
          } else {
            const data = await res.json();
            setAdminProfile(data);
          }
        }
      } catch (err: any) {
        // Keep logs minimal to avoid dev overlay noise
        console.warn("Admin profile fetch error:", err?.message ?? err);
        setProfileError("Không thể tải thông tin admin");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const getAvatarUrl = (avatar?: string) => {
    if (!avatar) return "/images/avatar-placeholder.png";
    // Nếu API trả về đường dẫn placeholder, ưu tiên dùng ảnh cục bộ
    if (avatar === "/images/avatar-placeholder.png") return "/images/avatar-placeholder.png";
    // Nếu là URL tuyệt đối
    if (avatar.startsWith("http")) return avatar;
    // Nếu là đường dẫn tương đối từ API, ghép base
    const base = "https://coursedan-api.onrender.com";
    try {
      return new URL(avatar, base).toString();
    } catch {
      return "/images/avatar-placeholder.png";
    }
  };

  const formatDateTime = (iso?: string) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Yêu cầu GV", href: "/admin/teachers", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Học viên", href: "/admin/students", icon: <Users className="w-5 h-5" /> },
    { name: "Duyệt khóa học", href: "/admin/courses", icon: <BookOpenCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* --- Header --- */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b border-gray-200">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          coursedan
        </Link>

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
        <div className="relative flex items-center gap-4">
          <span className="text-sm text-gray-700 font-medium">
            {loadingProfile
              ? "Đang tải..."
              : adminProfile?.fullName || "Admin"}
          </span>
          {/* Use native img for external avatar to avoid domain config issues */}
          <img
            src={getAvatarUrl(adminProfile?.avatar)}
            alt={adminProfile?.fullName || "Admin"}
            width={40}
            height={40}
            className="rounded-full border border-gray-300 object-cover"
            onClick={() => setProfileOpen((prev) => !prev)}
            onError={(e) => {
              // Fallback khi ảnh từ API bị lỗi hoặc không tồn tại
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/avatar-placeholder.png";
            }}
          />

          {profileOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={getAvatarUrl(adminProfile?.avatar)}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/avatar-placeholder.png";
                  }}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {adminProfile?.fullName || "Admin"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {adminProfile?.email || adminProfile?.username || ""}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Vai trò:</span>
                  <span className="font-medium">{adminProfile?.role || "admin"}</span>
                </div>
                {adminProfile?.lastLogin && (
                  <div className="flex justify-between">
                    <span>Đăng nhập:</span>
                    <span className="font-medium">{formatDateTime(adminProfile.lastLogin)}</span>
                  </div>
                )}
              </div>

              <button
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-2 rounded-md"
                onClick={() => {
                  // Xóa token và quay về trang đăng nhập
                  document.cookie =
                    "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
                  window.location.href = "/Login";
                }}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
