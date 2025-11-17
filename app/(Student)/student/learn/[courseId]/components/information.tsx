"use client";

import { Star, Briefcase, Award, Users, BookOpen, MessageCircle } from "lucide-react"; 
import { useParams } from "next/navigation";
import { useCourse } from "../_api/queries";
import { useCourseInfo } from "@/app/(Home)/course/[courseId]/_api/queries";

// Component để hiển thị rating bằng Stars (từ 5 sao)
const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={i} size={16} className="text-orange-500 fill-orange-500" />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={i + fullStars} size={16} className="text-gray-300" />
            ))}
        </div>
    );
};

export default function Information() {
    const params = useParams();
    const courseId = String(params.courseId);
    
    const courseQuery = useCourse(courseId);
    const infoQuery = useCourseInfo(courseId);

    // Xử lý Loading/Error
    if (courseQuery.isLoading || infoQuery.isLoading) {
        return <div className="py-10 text-center text-gray-500">Đang tải thông tin khóa học...</div>;
    }

    if (courseQuery.isError || infoQuery.isError || !courseQuery.data || !infoQuery.data) {
        return <div className="py-10 text-red-600">Lỗi: Không tải được thông tin khóa học.</div>;
    }

    const course = courseQuery.data;
    const info = infoQuery.data;

    const initial = course.instructor.name[0];
    const totalReviews = Object.values(course.rating).reduce((sum, count) => sum + count, 0);
    // Tính rating trung bình
    const averageRating = (course.rating["5"] * 5 + course.rating["4"] * 4 + course.rating["3"] * 3) / (totalReviews || 1);


    return (
        <div className="mt-6 space-y-3">
            
            {/* === 1. TIÊU ĐỀ & MÔ TẢ === */}
            <section>
                <h1 className="text-3xl font-extrabold text-gray-700 mb-2">{course.courseTitle}</h1>
                <p className="text-lg text-gray-600 mb-4">{info.description}</p>
                
                {/* Rating và Số lượng học viên */}
                <div className="flex items-center gap-6 text-sm border-b pb-4">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-orange-500 text-lg">{averageRating.toFixed(1)}</span>
                        <RatingStars rating={averageRating} />
                        <span className="text-gray-500">({totalReviews} đánh giá)</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-600">
                        <Users size={16} className="text-blue-500" />
                        <span className="font-semibold">{info.numberOfStudents}</span>
                        <span>người đang học</span>
                    </div>
                </div>
            </section>


            {/* === 2. GIỚI THIỆU GIẢNG VIÊN (INSTRUCTOR CARD - Bố cục dọc mới) === */}
            <section className="p-6 border border-gray-200 rounded-xl shadow-md bg-white">
                
                {/* Tiêu đề chính */}
                <h2 className="text-2xl font-extrabold text-gray-800 mb-6 border-b pb-3">Giảng viên</h2>

                {/* Phần Avatar, Tên, Chức danh và Thống kê */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                    
                    {/* Ảnh đại diện & Tên */}
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="w-20 h-20 rounded-full bg-blue-100 text-center flex items-center justify-center text-3xl font-bold text-blue-700 overflow-hidden">
                            {initial}
                        </div>
                        <div>
                            <p className="font-bold text-xl text-blue-500 hover:text-blue-600 cursor-pointer">{course.instructor.name}</p>
                            <p className="text-sm text-gray-600 font-semibold">{course.instructor.title}</p>
                        </div>
                    </div>
                    
                    {/* Thống kê (Dữ liệu từ API) */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 md:ml-auto">
                        <div className="flex items-center gap-2">
                            <Star size={16} className="text-orange-500 shrink-0" />
                            <span>{averageRating.toFixed(1)} xếp hạng</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageCircle size={16} className="text-blue-500 shrink-0" />
                            <span>{totalReviews} đánh giá</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-blue-500 shrink-0" />
                            <span>{info.numberOfStudents} học viên</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-blue-500 shrink-0" />
                            <span>10 khóa học</span> {/* Giữ nguyên giá trị giả lập */}
                        </div>
                    </div>
                </div>
                
                {/* === CHI TIẾT GIẢNG VIÊN (BỐ CỤC DỌC - MỖI MỤC MỘT KHỐI) === */}
                <div className="space-y-6 text-sm text-gray-700">
                    
                    {/* Tiểu sử (Bio) */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                            <Briefcase size={16} className="text-blue-500"/> Tiểu sử
                        </h3>
                        <p className="leading-relaxed pl-6 italic">{course.instructor.bio}</p>
                    </div>

                    {/* Kinh nghiệm */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                            <Briefcase size={16} className="text-blue-500"/> Kinh nghiệm
                        </h3>
                        <p className="leading-relaxed pl-6">{course.instructor.experience}</p>
                    </div>

                    {/* Chứng chỉ */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                            <Award size={16} className="text-blue-500"/> Chứng chỉ
                        </h3>
                        {course.instructor.certificate && course.instructor.certificate.length > 0 ? (
                            <ul className="list-disc list-inside pl-6 space-y-1">
                                {course.instructor.certificate.map((cert, index) => (
                                    <li key={index} className="pl-1">{cert}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="pl-6 text-gray-500 italic">Chưa có chứng chỉ nào được liệt kê.</p>
                        )}
                    </div>
                    
                    {/* Chức danh (Nếu không trùng với dòng tên) */}
                    <div className="border-t pt-4 border-gray-300">
                        <h3 className="font-semibold text-gray-800 mb-1">Chức danh/Vị trí</h3>
                        <p className="pl-6">{course.instructor.title}</p>
                    </div>

                </div>
            </section>
        </div>
    );
}