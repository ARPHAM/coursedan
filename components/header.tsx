"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, Heart, Bell } from "lucide-react";
export default function Header() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [payload, setPayload] = useState<
    { id: string; email: string; role: string[]; exp: string } | undefined
  >(undefined);
  const [openNotification, setOpenNotification] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    const accessToken = match
      ? decodeURIComponent(match.split("=")[1])
      : undefined;
    setToken(accessToken);

    if (accessToken) {
      try {
        const parts = accessToken.split(".");
        if (parts.length === 3) {
          const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
          const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
          const jsonPayload = decodeURIComponent(
            atob(padded)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const rawPayload = JSON.parse(jsonPayload);

          setPayload({
            id: rawPayload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
            email:
              rawPayload.email ||
              rawPayload[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
              ],
            role:
              rawPayload.role ||
              rawPayload[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ],
            exp: rawPayload.exp,
          });
        }
      } catch (err) {}
    }
  }, []);

  const isLoggedIn = !!token;

  return (
    <header className="bg-white w-full px-4 sm:px-6 py-4 border-b-2 border-gray-200">
      <div className="max-w-full mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            coursedan
          </Link>
        </div>

        <div className="grow max-w-xl relative hidden sm:block">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm nội dung bất kỳ"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full bg-gray-50 focus:border-blue-500 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {payload && payload.role.includes("Instructor") && (
            <Link
              href="/teach"
              className="text-sm text-gray-700 hover:text-blue-600 hidden lg:block"
            >
              Giảng dạy
            </Link>
          )}
          {payload && payload.role.includes("Student") && (
            <Link
              href="/student/my-courses"
              className="text-sm text-gray-700 hover:text-blue-600 hidden lg:block"
            >
              Khóa học của tôi
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <Link href="/student/cart" className="hover:text-blue-600 p-1">
                <ShoppingCart className="w-6 h-6" />
              </Link>
              <div
                className="relative hover:text-blue-600 p-1 hidden sm:block"
                onMouseEnter={() => setOpenNotification(true)}
                onMouseLeave={() => setOpenNotification(false)}
              >
                <Bell className="w-6 h-6" />
                {openNotification && (
                  <div className="absolute right-0 w-40 bg-white border rounded-lg shadow-lg text-sm z-50">
                    <Link
                      href="/student/profile"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        document.cookie =
                          "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <div
                className="relative inline-block"
                onMouseEnter={() => setOpenSetting(true)}
                onMouseLeave={() => setOpenSetting(false)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold cursor-pointer">
                  {payload && typeof payload === "object" && "email" in payload
                    ? (payload as any).email.charAt(0).toUpperCase()
                    : "U"}
                </div>
                {openSetting && (
                  <div className="absolute right-0 w-40 bg-white border rounded-lg shadow-lg text-sm z-50">
                    <Link
                      href="/student/profile"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        document.cookie =
                          "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/Login"
                className="px-4 py-2 border border-gray-800 rounded-md text-sm font-bold text-gray-800 hover:bg-gray-50"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-gray-800 border border-gray-800 rounded-md text-sm font-bold text-white hover:bg-gray-700 hidden sm:block"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
