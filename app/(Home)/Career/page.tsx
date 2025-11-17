"use client";

import { Briefcase, MapPin, Clock } from "lucide-react";
import Link from "next/link"; 

const JobCard = ({ title, description, type, location }) => (
    <div className="border border-purple-200 rounded-xl p-6 mb-4 hover:shadow-lg transition flex justify-between items-center">
        <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <div className="flex space-x-3 text-xs font-semibold">
                <span className="flex items-center gap-1 bg-purple-100 text-blue-700 px-2 py-1 rounded-full"><Clock size={12} /> {type}</span>
                <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full"><MapPin size={12} /> {location}</span>
            </div>
        </div>
        <Link href={`/careers/${title.replace(/\s/g, '-').toLowerCase()}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shrink-0">
            Xem chi tiết
        </Link>
    </div>
);

export default function CareersPage() {
  return (
    <div className="bg-white">
      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blr-700" /> Gia nhập đội ngũ Coursedan
        </h1>
        <p className="text-xl text-gray-600 mb-10 border-b pb-4">
            Cùng chúng tôi định hình tương lai của giáo dục trực tuyến tại Việt Nam.
        </p>

        <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Môi trường làm việc & Phúc lợi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                    <h3 className="font-semibold mb-2">Văn hóa & Đổi mới</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Linh hoạt về thời gian và địa điểm (Work from anywhere).</li>
                        <li>Đề cao tính sáng tạo và trách nhiệm cá nhân.</li>
                        <li>Chủ động đề xuất và thử nghiệm công nghệ mới.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Chế độ đãi ngộ</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Lương thưởng cạnh tranh, đánh giá hiệu suất 2 lần/năm.</li>
                        <li>Bảo hiểm sức khỏe toàn diện.</li>
                        <li>Quỹ đào tạo và phát triển cá nhân.</li>
                    </ul>
                </div>
            </div>
        </section>

        <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Vị trí đang tuyển</h2>
            
            <JobCard 
                title="Senior Frontend Developer (React/Next.js)"
                description="Lãnh đạo đội ngũ phát triển giao diện người dùng và kiến trúc Micro Frontend."
                type="Full-time"
                location="Remote/Hà Nội"
            />
            
            <JobCard 
                title="Product Manager"
                description="Định hướng sản phẩm, phân tích thị trường và tối ưu hóa trải nghiệm học tập."
                type="Full-time"
                location="Hồ Chí Minh"
            />
            
            <JobCard 
                title="Chuyên viên Nội dung Khóa học"
                description="Hỗ trợ Giảng viên xây dựng kịch bản video và tối ưu hóa tài liệu học tập."
                type="Part-time"
                location="Remote"
            />
        </section>
        
        <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-700 mb-4">Gửi hồ sơ của bạn (CV, Portfolio) đến địa chỉ:</p>
            <a href="mailto:careers@coursedan.vn" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                careers@coursedan.vn
            </a>
        </div>
      </main>
    </div>
  );
}