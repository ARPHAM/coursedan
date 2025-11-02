import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("🔒 Proxy running:", pathname);

  const PUBLIC_PATHS = ["/", "/Login", "/register", "/404"];
  if (PUBLIC_PATHS.includes(pathname)) {
    console.log("🔓 Public path, no auth required.");
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    console.log("🚫 No token found. Redirecting to /Login");
    return NextResponse.redirect(new URL("/Login", req.url));
  } else {
    console.log(token);
  }

  try {
    const rawPayload: any = jwtDecode<any>(token);
    const payload = {
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
    };
    console.log("🔍 Decoded token payload:", payload);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.log("⏰ Token expired. Redirecting to /Login");
      const res = NextResponse.redirect(new URL("/Login", req.url));
      res.cookies.delete("access_token");
      return res;
    }

    // Kiểm tra role
    if (pathname.startsWith("/admin") && payload.role !== "Admin") {
      console.log("❌ User not admin. Redirecting to /404");
      return NextResponse.redirect(new URL("/404", req.url));
    }

    if (pathname.startsWith("/student") && payload.role !== "Student") {
      console.log("❌ User not student. Redirecting to /404");
      return NextResponse.redirect(new URL("/404", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("❌ Failed to decode token:", err);
    const res = NextResponse.redirect(new URL("/Login", req.url));
    res.cookies.delete("access_token");
    return res;
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
