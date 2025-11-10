"use client";
import { useState } from "react";

export default function ApplyInstructorPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    title: "",
    experience: "",
    bio: "",
    portfolioUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/instructor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Lỗi khi gửi yêu cầu");
      alert("✅ Gửi yêu cầu thành công! Vui lòng chờ xét duyệt.");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Đăng ký trở thành giảng viên
      </h1>
      <p className="text-gray-600 mb-6">
        Vui lòng cung cấp thông tin cá nhân và kinh nghiệm giảng dạy của bạn.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Chức danh / Nghề nghiệp
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="VD: Lập trình viên backend tại FPT"
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Kinh nghiệm giảng dạy
          </label>
          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            rows={3}
            placeholder="VD: 5 năm giảng dạy React, Node.js tại trung tâm XYZ"
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Giới thiệu bản thân
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Mô tả ngắn về kỹ năng, dự án, hoặc đam mê giảng dạy của bạn"
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Portfolio / LinkedIn / Website
          </label>
          <input
            type="url"
            name="portfolioUrl"
            value={form.portfolioUrl}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </button>
      </form>
    </div>
  );
}
