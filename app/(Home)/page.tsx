import Link from "next/link";
import Image from "next/image";
import Course from "@/components/course";
import NavbarMain from "@/components/navbarMain";

export default function Home() {
  return (
    <>
      <NavbarMain />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Chào mừng đến với Coursedan!
        </h1>

        {/* --- Banner --- */}
        <div className="relative w-full h-64 md:h-67 rounded-lg overflow-hidden">
          <Image
            src="/images/banner.png"
            alt="Banner khóa học"
            fill
            className="object-cover"
            priority
          />

          {/* Lớp chữ phủ trên banner */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              Khám phá khoá học tuyệt vời!
            </h1>
            <p className="text-lg md:text-xl">
              Cùng học, cùng phát triển mỗi ngày
            </p>
          </div>
        </div>

        {/* --- Nội dung trang --- */}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link href="/testcolor" className="ml-4 text-blue-500 hover:underline">
          TestColor
        </Link>
        <Link href="/profile" className="ml-4 text-blue-500 hover:underline">
          profile
        </Link>

        <div className="mt-8 flex flex-wrap gap-6">
          <Course className="m-4" />
          <Course className="m-4" url="1" />
        </div>
      </div> {/* ✅ Thêm dòng này */}
    </>
  );
}
