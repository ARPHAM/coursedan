"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react"; // THÊM useRef
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Bell, ShoppingCart, Search, LogOut, User, X } from "lucide-react"; // THÊM icons mới
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query"; // Giả sử đã import

// --- HẠN CHẾ: KHÔNG THỂ TẠO FILE MỚI ---
// Dưới đây là hook GET notifications, bạn nên đặt nó trong một file riêng
const useGetNotifications = (enabled: boolean) => {
    return useQuery({
        queryKey: ['instructorNotifications'],
        queryFn: async () => {
            const res = await fetch("/api/instructor/notifications"); // Giả định API
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        },
        enabled: enabled, // Chỉ fetch khi dropdown mở
    });
};
// ------------------------------------

export default function GlobalHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // States cho Dropdown Icons
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    // Hooks cho Search (Giữ nguyên logic của bạn)
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [debouncedTerm] = useDebouncedValue(searchTerm, 500);

    // Hooks cho Notifications (Sử dụng enabled: showNotifications)
    const { data: notificationsData, isLoading: isLoadingNotifications } = 
        useGetNotifications(showNotifications); // Feature 2 (Notifications)

    // Logic Đóng Dropdown khi click ra ngoài
    const bellRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Logic Search (Chỉ áp dụng trên /teach)
    useEffect(() => {
        if (pathname === '/teach') {
            const params = new URLSearchParams(searchParams);
            if (debouncedTerm) {
                params.set('search', debouncedTerm);
            } else {
                params.delete('search');
            }
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [debouncedTerm, pathname, router,]);

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3 gap-8">
                
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    coursedan
                </Link>

                {/* Ô tìm kiếm */}
                <div className="flex-1 max-w-2xl relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm nội dung bất kỳ"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Navigation & Icons */}
                <nav className="flex items-center gap-5 text-sm font-medium text-gray-700 flex-shrink-0">
                    {/* Các liên kết */}
                    <Link href="/teach/dashboard" className="hover:text-black whitespace-nowrap px-2">Dashboard</Link>
                    <Link href="/teach" className="hover:text-black whitespace-nowrap px-2">Khóa học của tôi</Link>
                    <Link href="/teach/create" className="hover:text-black whitespace-nowrap px-2">Tạo khóa học</Link>

                    {/* Icons */}
                    <button className="hover:text-black p-1">
                        <ShoppingCart className="w-6 h-6" />
                    </button>
                    
                    {/* ✨ FEATURE 2: Nút Thông báo (Notifications) */}
                    <div className="relative" ref={bellRef}>
                        <button 
                            className="hover:text-black p-1" 
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Bell className="w-6 h-6" />
                            {!notificationsData?.notifications[0]?.isRead && (
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
                            )}
                        </button>
                        
                        {showNotifications && (
                            <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl border z-30 overflow-hidden">
                                <div className="p-3 font-semibold border-b">Thông báo</div>
                                {isLoadingNotifications ? (
                                    <div className="p-4 text-center text-gray-500">Đang tải...</div>
                                ) : (
                                    <div className="max-h-80 overflow-y-auto">
                                        {notificationsData?.notifications?.length ? (
                                            notificationsData.notifications.map((n) => (
                                                <div key={n.id} className={`p-3 text-xs border-b last:border-b-0 cursor-pointer ${!n.isRead ? 'bg-blue-50' : ''}`}>
                                                    <div className="font-semibold">{n.title}</div>
                                                    <p className="text-gray-600 line-clamp-1">{n.description}</p>
                                                    <p className="text-right text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-gray-500">Không có thông báo mới.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* ✨ FEATURE 3: Nút User Avatar và Dropdown */}
                    <div className="relative ml-1" ref={userRef}>
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="bg-gray-800 text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition hover:ring-2 hover:ring-blue-500 flex-shrink-0"
                        >
                            V {/* Chữ cái đầu tên người dùng */}
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-xl border z-30 py-1">
                                <Link href="/teach/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 whitespace-nowrap">
                                    <User className="w-4 h-4" /> Profile
                                </Link>
                                <button onClick={() => { /* Thêm logic Đăng xuất tại đây */ alert('Đã đăng xuất!'); router.push('/'); }} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 w-full text-left hover:bg-gray-100">
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