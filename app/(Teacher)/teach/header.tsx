"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, LogOut, User } from "lucide-react"; // Chỉ giữ lại icons cần thiết
import { useDebouncedValue } from "@mantine/hooks";
// ❌ Đã loại bỏ: useQuery, useGetNotifications

export default function GlobalHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // States cho User Menu
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    // Hooks cho Search 
    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || ""
    );
    const [debouncedTerm] = useDebouncedValue(searchTerm, 500);

    // Logic Đóng User Dropdown khi click ra ngoài
    const userRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Logic Search (Chỉ áp dụng trên /teach)
    useEffect(() => {
        // Chỉ cập nhật URL nếu đang ở trang /teach
        if (pathname === "/teach") {
            const params = new URLSearchParams(searchParams);
            if (debouncedTerm) {
                params.set("search", debouncedTerm);
            } else {
                params.delete("search");
            }
            // Sử dụng router.replace để tránh thêm quá nhiều lịch sử trình duyệt
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [debouncedTerm, pathname, router]);

    return (
        <header className="w-full bg-blue-900 border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3 gap-8">
                
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-white">
                    coursedan
                </Link>

                {/* Ô tìm kiếm */}
                <div className="flex-1 max-w-2xl relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm nội dung bất kỳ"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Navigation & User Menu */}
                <nav className="flex items-center gap-5 text-sm font-medium text-white shrink-0">
                    
                    {/* Các liên kết */}
                    <Link
                        href="/teach/dashboard"
                        className="hover:text-gray-300 whitespace-nowrap px-2"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/teach"
                        className="hover:text-gray-300 whitespace-nowrap px-2"
                    >
                        Khóa học của tôi
                    </Link>
                    <Link
                        href="/teach/create"
                        className="hover:text-gray-300 whitespace-nowrap px-2"
                    >
                        Tạo khóa học
                    </Link>

                    {/* FEATURE: Nút User Avatar và Dropdown */}
                    <div className="relative ml-1" ref={userRef}>
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="bg-gray-800 text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition hover:ring-2 hover:ring-blue-500 shrink-0"
                        >
                            V {/* Chữ cái đầu tên người dùng */}
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-xl border z-30 py-1">
                                <Link
                                    href="/teach/profile"
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 whitespace-nowrap"
                                >
                                    <User className="w-4 h-4" /> Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        /* Thêm logic Đăng xuất tại đây */ 
                                        alert("Đã đăng xuất!");
                                        router.push("/");
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-black w-full text-left hover:bg-gray-100"
                                >
                                    <LogOut className="w-4 h-4" /> Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}