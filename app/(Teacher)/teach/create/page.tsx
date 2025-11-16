"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowLeft, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import Link from "next/link";

// 1. Import hook tạo khóa học (Đã giả định)
import { useCreateCourse } from "./api/mutation"; 

// Định nghĩa Initial State cho Thông tin cơ bản
const initialCourseDetails = {
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
};

export default function CreateCoursePage() {
    // Hooks
    const router = useRouter();
    const { mutate: createCourse, isPending: isCreating } = useCreateCourse(); 

    // State 1: Thông tin cơ bản của khóa học
    const [courseDetails, setCourseDetails] = useState(initialCourseDetails);

    // State 2: Nội dung (Sections/Lectures) - Giữ nguyên logic ban đầu của bạn
    const [sections, setSections] = useState([
        {
            title: "Phần 1: Giới thiệu",
            isOpen: true,
            lectures: [
                { title: "", description: "", videoUrl: "", duration: "", isFree: false },
            ],
        },
    ]);

    // --- CÁC HÀM QUẢN LÝ STATE (Giữ nguyên) ---
    const addSection = () => {
        setSections([
            ...sections,
            { title: `Phần ${sections.length + 1}`, isOpen: true, lectures: [] },
        ]);
    };

    const addLecture = (sectionIndex: number) => {
        const updated = [...sections];
        updated[sectionIndex].lectures.push({
            title: "",
            description: "",
            videoUrl: "",
            duration: "",
            isFree: false,
        });
        setSections(updated);
    };

    const toggleSection = (index: number) => {
        const updated = [...sections];
        updated[index].isOpen = !updated[index].isOpen;
        setSections(updated);
    };

    const removeSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const removeLecture = (sectionIndex: number, lectureIndex: number) => {
        const updated = [...sections];
        updated[sectionIndex].lectures.splice(lectureIndex, 1);
        setSections(updated);
    };

    // --- HÀM XỬ LÝ SUBMISSION ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Chuẩn bị dữ liệu (mapping và chuẩn hóa)
        const submissionData = {
            ...courseDetails,
            price: Number(courseDetails.price),
            
            sections: sections.map(s => ({
                title: s.title,
                // Lấy lectures, đảm bảo duration là NUMBER để khớp với type
                lectures: s.lectures.map(l => ({
                    title: l.title,
                    description: l.description,
                    videoUrl: l.videoUrl,
                    isFree: l.isFree,
                    duration: parseInt(l.duration) || 0, // Chuyển từ string input sang NUMBER
                })),
            })),
        };

        // 2. Gọi mutation
        createCourse(submissionData);
    };


    // ====== RENDER FORM TẠO KHÓA HỌC ======

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto"> 
                {/* 🔙 Quay lại */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-700">
                    <ArrowLeft className="w-4 h-4" />
                    <Link href="/teach/dashboard" className="hover:underline">
                        Quay lại
                    </Link>
                </div>

                {/* 🧾 Tiêu đề */}
                <h1 className="text-2xl font-semibold mb-8">Tạo khóa học mới</h1>

                {/* === Thông tin cơ bản === */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border">
                    <h2 className="text-lg font-semibold mb-1">Thông tin cơ bản</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Điền thông tin cơ bản về khóa học của bạn
                    </p>

                    <div className="space-y-4">
                        {/* Tên khóa học */}
                        <input
                            type="text"
                            placeholder="Tên khóa học"
                            value={courseDetails.title}
                            onChange={(e) => setCourseDetails({...courseDetails, title: e.target.value})}
                            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50"
                        />
                        {/* Mô tả */}
                        <textarea
                            placeholder="Mô tả chi tiết về khóa học..."
                            value={courseDetails.description}
                            onChange={(e) => setCourseDetails({...courseDetails, description: e.target.value})}
                            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50"
                            rows={2}
                        />
                        {/* Giá */}
                        <input
                            type="number"
                            placeholder="Giá (VND)"
                            value={courseDetails.price || ""}
                            onChange={(e) => setCourseDetails({...courseDetails, price: Number(e.target.value) || 0})}
                            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50"
                        />
                        {/* Ảnh đại diện */}
                        <input
                            type="url"
                            placeholder="URL ảnh đại diện"
                            value={courseDetails.imageUrl}
                            onChange={(e) => setCourseDetails({...courseDetails, imageUrl: e.target.value})}
                            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-50"
                        />
                    </div>
                </div>

                {/* === Nội dung khóa học (Sections/Lectures) === */}
                <div className="bg-white rounded-xl shadow-sm p-6 border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Nội dung khóa học</h2>
                        <button
                            type="button"
                            onClick={addSection}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" /> Thêm phần
                        </button>
                    </div>

                    {sections.map((section, sIndex) => (
                        <div key={sIndex} className="border rounded-xl mb-4 bg-gray-50">
                            {/* Section header */}
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
                                onClick={() => toggleSection(sIndex)}
                            >
                                <div className="font-medium text-gray-800 flex items-center gap-2">
                                    {section.isOpen ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                    <input
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => {
                                            const updated = [...sections];
                                            updated[sIndex].title = e.target.value;
                                            setSections(updated);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="border-none bg-transparent focus:ring-0 w-full text-sm"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSection(sIndex);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                                </button>
                            </div>

                            {/* Lectures list */}
                            {section.isOpen && (
                                <div className="p-4 space-y-4 border-t bg-white">
                                    {section.lectures.map((lecture, lIndex) => (
                                        <div
                                            key={lIndex}
                                            className="border rounded-lg p-4 bg-gray-50 space-y-3"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-medium text-sm">
                                                    Bài {lIndex + 1}
                                                </h4>
                                                <button
                                                    type="button"
                                                    onClick={() => removeLecture(sIndex, lIndex)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <input
                                                type="text"
                                                placeholder="Tiêu đề bài giảng"
                                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                                                value={lecture.title}
                                                onChange={(e) => {
                                                    const updated = [...sections];
                                                    updated[sIndex].lectures[lIndex].title =
                                                        e.target.value;
                                                    setSections(updated);
                                                }}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Mô tả ngắn"
                                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                                                value={lecture.description}
                                                onChange={(e) => {
                                                    const updated = [...sections];
                                                    updated[sIndex].lectures[lIndex].description =
                                                        e.target.value;
                                                    setSections(updated);
                                                }}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="url"
                                                    placeholder="Video URL"
                                                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                                                    value={lecture.videoUrl}
                                                    onChange={(e) => {
                                                        const updated = [...sections];
                                                        updated[sIndex].lectures[lIndex].videoUrl =
                                                            e.target.value;
                                                        setSections(updated);
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Thời lượng (phút)"
                                                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                                                    value={lecture.duration}
                                                    onChange={(e) => {
                                                        const updated = [...sections];
                                                        updated[sIndex].lectures[lIndex].duration =
                                                            e.target.value;
                                                        setSections(updated);
                                                    }}
                                                />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={lecture.isFree}
                                                    onChange={(e) => {
                                                        const updated = [...sections];
                                                        updated[sIndex].lectures[lIndex].isFree =
                                                            e.target.checked;
                                                        setSections(updated);
                                                    }}
                                                />
                                                <span className="text-sm text-gray-700">
                                                    Cho phép học thử (free)
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => addLecture(sIndex)}
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                                    >
                                        <Plus className="w-4 h-4" /> Thêm bài giảng
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button 
                        onClick={() => router.push("/teach/dashboard")}
                        type="button" 
                        className="px-5 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                    >
                        Hủy
                    </button>
                    <button 
                        type="submit"
                        disabled={isCreating}
                        className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"                    >
                        {isCreating ? "Đang tạo..." : "Tạo khóa học"}
                    </button>
                </div>
            </form>
        </div>
    );
}