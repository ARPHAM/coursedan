export default function Information() {
  const teacher = {
    name: "Nguyễn Văn Code",
    description:
      "Giảng viên Frontend với hơn 10 năm kinh nghiệm trong ngành phát triển web. Chuyên gia về React và JavaScript.",
    certificate: [
      "Chứng chỉ React Professional",
      "Chứng chỉ JavaScript Nâng cao",
    ],
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  };
  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-2">Khóa học React cơ bản</h1>
      <p className="text-gray-600 mb-4">
        Học cách xây dựng ứng dụng React hiện đại từ con số 0 — dễ hiểu, dễ thực
        hành, dành cho người mới bắt đầu.
      </p>

      <div className="flex items-center gap-3 border-t border-b py-4">
        <img
          src={teacher.avatarUrl}
          alt="Instructor avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{teacher.name}</p>
          <p className="text-sm text-gray-500">{teacher.description}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Mô tả bài học</h2>
        <p className="text-gray-700 leading-relaxed">
          Trong bài học này, bạn sẽ được giới thiệu tổng quan về React và cách
          cấu trúc một dự án React hiện đại...
        </p>
      </div>
    </div>
  );
}
