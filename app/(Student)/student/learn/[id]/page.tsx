"use client";

export default function Page() {
  const lectures = [
    { id: 1, title: "Giới thiệu khóa học", duration: "05:32" },
    { id: 2, title: "Cài đặt môi trường", duration: "08:15" },
    { id: 3, title: "Cấu trúc dự án", duration: "10:42" },
    { id: 4, title: "React Component cơ bản", duration: "12:20" },
    { id: 5, title: "Props & State", duration: "09:58" },
    { id: 6, title: "Xử lý sự kiện và hooks", duration: "14:01" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left section */}
      <div className="flex-1 p-6">
        {/* Video player */}
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/-jV06pqjUUc?si=HMbpnUd7da03v39Q"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {/* <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/KabeMVHgRLQ?si=HD7ziETNyWIkDuoJ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> */}
        </div>

        {/* Course info */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-2">Khóa học React cơ bản</h1>
          <p className="text-gray-600 mb-4">
            Học cách xây dựng ứng dụng React hiện đại từ con số 0 — dễ hiểu, dễ
            thực hành, dành cho người mới bắt đầu.
          </p>

          {/* Instructor info */}
          <div className="flex items-center gap-3 border-t border-b py-4">
            <img
              src="https://i.pravatar.cc/60?img=12"
              alt="Instructor avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Nguyễn Văn Code</p>
              <p className="text-sm text-gray-500">Giảng viên Frontend</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Mô tả bài học</h2>
            <p className="text-gray-700 leading-relaxed">
              Trong bài học này, bạn sẽ được giới thiệu tổng quan về React và
              cách cấu trúc một dự án React hiện đại. Đồng thời, chúng ta sẽ tìm
              hiểu cách React hoạt động phía dưới và lý do vì sao nó trở thành
              thư viện phổ biến nhất hiện nay.
            </p>
          </div>
        </div>
      </div>

      {/* Right section - lecture list */}
      <div className="w-80 border-l bg-white p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Danh sách bài giảng</h2>
        <ul className="space-y-2">
          {lectures.map((lecture) => (
            <li
              key={lecture.id}
              className="p-3 border rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{lecture.title}</span>
                <span className="text-sm text-gray-500">
                  {lecture.duration}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
