import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const PUBLIC_PATHS = ["/", "/Login", "/register"];
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
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

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      const res = NextResponse.redirect(new URL("/Login", req.url));
      res.cookies.delete("access_token");
      return res;
    }

    if (pathname.startsWith("/admin") && payload.role !== "Admin") {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (
      (pathname.startsWith("/student") ||
        ["checkout", "/cart"].includes(pathname)) &&
      payload.role !== "Student"
    ) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (pathname.startsWith("/teach") && payload.role !== "Instructor") {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.next();
  } catch (err) {
    const res = NextResponse.redirect(new URL("/Login", req.url));
    res.cookies.delete("access_token");
    return res;
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
// export default function proxy(req: NextRequest) {
//   return NextResponse.next();
// }
