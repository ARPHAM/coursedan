import Link from "next/link";
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

        <Link href="/Login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link href="/testcolor" className="ml-4 text-blue-500 hover:underline">
          TestColor
        </Link>

        <div className="mt-8 flex flex-wrap gap-6">
          <Course className="m-4" />
          <Course className="m-4" url="1" />
        </div>
      </div>
    </>
  );
}
