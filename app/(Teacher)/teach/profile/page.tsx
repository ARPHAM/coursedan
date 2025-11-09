"use client";

import { useState, useEffect } from "react";

export default function InstructorProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    title: "",
    bio: "",
    expertise: "",
    experienceYears: "",
    avatarUrl: "",
    facebookUrl: "",
    linkedInUrl: "",
    youtubeUrl: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 🧠 Lấy thông tin hồ sơ
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/instructor/profile");
        if (!res.ok) throw new Error("Không thể tải hồ sơ");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/instructor/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      alert("✅ Cập nhật hồ sơ giảng viên thành công!");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500">
        Đang tải thông tin hồ sơ...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-8 mt-10">
      <h1 className="text-2xl font-semibold mb-2 text-gray-800">
        Hồ sơ giảng viên
      </h1>
      <p className="text-gray-600 mb-6">
        Cập nhật thông tin cá nhân của bạn để hiển thị trên trang khóa học.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Họ và tên */}
        <div>
          <label className="block text-sm font-medium mb-1">Họ và tên</label>
          <input
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            type="text"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Chức danh */}
        <div>
          <label className="block text-sm font-medium mb-1">Chức danh</label>
          <input
            name="title"
            value={profile.title}
            onChange={handleChange}
            type="text"
            placeholder="VD: Chuyên gia ReactJS, Lập trình viên backend..."
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Giới thiệu */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Giới thiệu bản thân
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 resize-none"
            placeholder="Giới thiệu ngắn về bản thân, kinh nghiệm giảng dạy..."
          />
        </div>

        {/* Chuyên môn */}
        <div>
          <label className="block text-sm font-medium mb-1">Chuyên môn</label>
          <input
            name="expertise"
            value={profile.expertise}
            onChange={handleChange}
            type="text"
            placeholder="VD: Web Development, AI, Data Science..."
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Kinh nghiệm */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Số năm kinh nghiệm
          </label>
          <input
            name="experienceYears"
            value={profile.experienceYears}
            onChange={handleChange}
            type="number"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Ảnh đại diện */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Ảnh đại diện (URL)
          </label>
          <input
            name="avatarUrl"
            value={profile.avatarUrl}
            onChange={handleChange}
            type="url"
            className="w-full border rounded-lg px-3 py-2 mb-2"
          />
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full border"
            />
          )}
        </div>

        {/* Mạng xã hội */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Facebook URL
            </label>
            <input
              name="facebookUrl"
              value={profile.facebookUrl}
              onChange={handleChange}
              type="url"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              LinkedIn URL
            </label>
            <input
              name="linkedInUrl"
              value={profile.linkedInUrl}
              onChange={handleChange}
              type="url"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              YouTube URL
            </label>
            <input
              name="youtubeUrl"
              value={profile.youtubeUrl}
              onChange={handleChange}
              type="url"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Nút lưu */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
