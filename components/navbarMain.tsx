import Link from "next/link"; 

export default function NavbarMain() {
  // Đã cập nhật mảng links với 5 khóa học
  const links = [
    { href: "/khoa-hoc/lap-trinh-web", label: "Lập trình web" },
    { href: "/khoa-hoc/phan-tich-du-lieu", label: "Phân tích dữ liệu" },
    { href: "/khoa-hoc/kinh-doanh-so", label: "Kinh doanh số" },
    { href: "/khoa-hoc/tri-tue-nhan-tao", label: "Trí tuệ nhân tạo" },
    { href: "/khoa-hoc/thiet-ke-ux-ui", label: "Thiết kế UX/UI" },
  ];

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4 w-full justify-center">
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              index !== 0 ? "border-l border-gray-300 pl-4" : ""
            } text-gray-700 hover:text-gray-900 hover:underline`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}