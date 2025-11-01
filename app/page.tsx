import Link from "next/link";
import BannerCourse from "@/components/bannerCourse"; 

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chào mừng đến với Coursedan!</h1>
      
      <Link href="/Login" className="text-blue-500 hover:underline">
        Login
      </Link>
      <Link href="/testcolor" className="ml-4 text-blue-500 hover:underline">
        TestColor
      </Link>

      <div className="mt-8">
        <BannerCourse className="m-4" />
      </div>
    </div>
  );
}
