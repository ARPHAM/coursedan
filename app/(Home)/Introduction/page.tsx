"use client";

import { MessageCircle, Zap, TrendingUp } from "lucide-react";
import Link from "next/link"; 

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Sứ mệnh của Coursedan: Tri thức không giới hạn
          </h1>
          <p className="text-xl opacity-90">
            Cung cấp nền tảng học tập chất lượng, thực tế, do các chuyên gia hàng đầu giảng dạy.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Tầm nhìn & Mục tiêu
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Chúng tôi hướng tới trở thành nền tảng e-learning hàng đầu, nơi 
            mọi cá nhân đều tìm thấy cơ hội phát triển sự nghiệp cá nhân và chuyên môn.
          </p>
          <p className="text-gray-600 italic">
            Mục tiêu 5 năm: Giúp 1 triệu người Việt Nam đạt được mục tiêu sự nghiệp trong lĩnh vực công nghệ và kinh doanh.
          </p>
        </section>

        {/* Value Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Giá trị cốt lõi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl shadow-md bg-purple-50 text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Đổi mới liên tục</h3>
              <p className="text-sm text-gray-600">Luôn cập nhật nội dung và công nghệ giảng dạy để giữ vững vị thế dẫn đầu.</p>
            </div>
            <div className="p-6 border rounded-xl shadow-md bg-blue-50 text-center">
              <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Đồng hành trọn đời</h3>
              <p className="text-sm text-gray-600">Hỗ trợ học viên trong và sau khóa học, tạo cộng đồng học tập bền vững.</p>
            </div>
            <div className="p-6 border rounded-xl shadow-md bg-green-50 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Hiệu quả thực tế</h3>
              <p className="text-sm text-gray-600">Kiến thức áp dụng được ngay, giúp học viên tăng trưởng rõ rệt trong sự nghiệp.</p>
            </div>
          </div>
        </section>
        
        <div className="text-center pt-8 border-t border-gray-200">
          <Link href="/khoa-hoc" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition shadow-lg">
            Khám phá thư viện khóa học
          </Link>
        </div>
      </main>
    </div>
  );
}