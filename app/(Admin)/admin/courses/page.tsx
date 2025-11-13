"use client";

import { Eye, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type PendingCourse = {
  id: number;
  title: string;
  level: string | null;
  category: string | null;
  description: string;
  priceAmount: number;
  priceFormatted: string;
  lessonCount: number;
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  instructorRating: number | null;
  courseImage: string | null;
  submissionDate: string;
  status: string;
  estimatedRevenue: number;
};

type ApprovedCourse = {
  id: number;
  title: string;
  instructor: {
    id: string;
    name: string;
  };
  courseImage: string | null;
  approvalDate: string; // yyyy-mm-dd
  studentCount: number;
  revenue: number;
  rating: number | null;
};

export default function CourseApprovalPage() {
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [pendingTotal, setPendingTotal] = useState<number>(0);
  const [loadingPending, setLoadingPending] = useState<boolean>(false);
  const [pendingError, setPendingError] = useState<string | null>(null);

  // --- Approved courses ---
  const [approvedCourses, setApprovedCourses] = useState<ApprovedCourse[]>([]);
  const [loadingApproved, setLoadingApproved] = useState<boolean>(false);
  const [approvedError, setApprovedError] = useState<string | null>(null);
  const [approvedDateFilter, setApprovedDateFilter] = useState<string>("");
  const [approvedInstructorFilter, setApprovedInstructorFilter] = useState<string>("");

  // --- Chi tiết khóa học ---
  type CourseDetail = {
    id: number;
    basicInfo: {
      title: string;
      description: string;
      category: string | null;
      level: string | null;
      price: number;
      language: string | null;
    };
    content: {
      syllabus: { title?: string; duration?: string }[];
      lessonCount: number;
      totalDuration: string;
      requirements: string[];
      targetAudience: string | null;
    };
    instructor: {
      id: string;
      name: string;
      email: string;
      experience: number | null;
      otherCourses: number | null;
    };
    media: {
      courseImage: string | null;
      previewVideo: string | null;
    };
    submissionInfo: {
      submissionDate: string;
      status: string;
      estimatedLaunchDate: string | null;
    };
  };
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detail, setDetail] = useState<CourseDetail | null>(null);

  const openCourseDetails = async (id: number) => {
    try {
      setDetailOpen(true);
      setDetailLoading(true);
      setDetailError(null);
      setDetail(null);
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
      const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

      const res = await fetch(
        `https://coursedan-api.onrender.com/api/admin/courses/${id}/details`,
        {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        }
      );
      if (!res.ok) throw new Error(`Failed to load course details (${res.status})`);
      const json = await res.json();
      setDetail(json);
    } catch (err: any) {
      console.error("Course details fetch error:", err);
      setDetailError("Không thể tải chi tiết khóa học");
    } finally {
      setDetailLoading(false);
    }
  };
  const closeDetails = () => {
    setDetailOpen(false);
    setDetail(null);
    setDetailError(null);
  };

  // Helper: sanitize url (remove stray backticks)
  const sanitizeImageUrl = (u?: string | null): string => {
    if (!u) return "/file.svg";
    let s = u.trim();
    if (s.startsWith("`") && s.endsWith("`")) s = s.slice(1, -1).trim();
    return s || "/file.svg";
  };

  useEffect(() => {
    const fetchPendingCourses = async () => {
      try {
        setLoadingPending(true);
        setPendingError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const res = await fetch(
          "https://coursedan-api.onrender.com/api/admin/courses/pending",
          {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
          }
        );
        if (!res.ok) throw new Error(`Failed to load pending courses (${res.status})`);
        const json = await res.json();
        const courses: PendingCourse[] = Array.isArray(json?.courses) ? json.courses : [];
        setPendingCourses(courses);
        setPendingTotal(typeof json?.totalPending === "number" ? json.totalPending : courses.length);
      } catch (err: any) {
        console.error("Pending courses fetch error:", err);
        setPendingError("Không thể tải danh sách khóa học chờ duyệt");
      } finally {
        setLoadingPending(false);
      }
    };

    fetchPendingCourses();
  }, []);

  useEffect(() => {
    const fetchApprovedCourses = async () => {
      try {
        setLoadingApproved(true);
        setApprovedError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const res = await fetch(
          "https://coursedan-api.onrender.com/api/admin/approved",
          {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
          }
        );
        if (!res.ok) throw new Error(`Failed to load approved courses (${res.status})`);
        const json = await res.json();
        const courses: ApprovedCourse[] = Array.isArray(json?.courses) ? json.courses : [];
        setApprovedCourses(courses);
      } catch (err: any) {
        console.error("Approved courses fetch error:", err);
        setApprovedError("Không thể tải danh sách khóa học đã phê duyệt");
      } finally {
        setLoadingApproved(false);
      }
    };

    fetchApprovedCourses();
  }, []);

  // Derived for filters
  const uniqueApprovedInstructors: { id: string; name: string }[] = Array.from(
    new Map(approvedCourses.map((c) => [c.instructor.id, c.instructor.name]))
  ).map(([id, name]) => ({ id, name }));
  const approvedFiltered = approvedCourses.filter((c) => {
    const byDate = approvedDateFilter ? c.approvalDate === approvedDateFilter : true;
    const byInstructor = approvedInstructorFilter ? c.instructor.id === approvedInstructorFilter : true;
    return byDate && byInstructor;
  });

  return (
    <>
    <div className="space-y-10">
      {/* --- Tiêu đề trang --- */}
      <h1 className="text-2xl font-bold text-[#0a092d]">Kiểm duyệt Khóa học</h1>

      {/* --- Tổng quan --- */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
        {pendingError ? (
          <p className="text-red-600 text-sm">{pendingError}</p>
        ) : (
          <p className="text-gray-700 text-sm">
            {loadingPending ? "Đang tải..." : `Có ${pendingTotal} khóa học đang chờ duyệt`}
          </p>
        )}
      </div>

      {/* --- Phần chờ duyệt --- */}
      <section>
        <h2 className="text-lg font-semibold text-[#0a092d] mb-4">
          Khóa học chờ duyệt
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(loadingPending && !pendingCourses.length) && (
            <div className="col-span-full text-center text-sm text-gray-600">Đang tải danh sách...</div>
          )}
          {pendingCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Ảnh */}
              <div className="h-56 w-full">
                <img
                  src={course.courseImage || "/file.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/file.svg";
                  }}
                />
              </div>

              {/* Nội dung */}
              <div className="p-3 space-y-2">
                {/* Tag */}
                <div className="flex gap-2 text-[11px]">
                  {course.category && (
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                      {course.category}
                    </span>
                  )}
                  {course.level && (
                    <span className="bg-gray-100 border border-gray-300 text-gray-700 px-2 py-1 rounded-md">
                      {course.level}
                    </span>
                  )}
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">Chờ duyệt</span>
                </div>

                {/* Tiêu đề & mô tả */}
                <h3 className="font-semibold text-[#0a092d] text-sm">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {course.description}
                </p>

                {/* Thông tin */}
                <div className="text-xs text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Giảng viên:</span>
                    <span className="font-medium">{course.instructorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email GV:</span>
                    <span className="font-medium">{course.instructorEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giá:</span>
                    <span className="font-medium">{course.priceFormatted || `${course.priceAmount} đ`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bài giảng:</span>
                    <span>{course.lessonCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ngày gửi:</span>
                    <span>{new Date(course.submissionDate).toLocaleString("vi-VN")}</span>
                  </div>
                </div>

                {/* Nút xem chi tiết */}
                <div
                  className="mt-2 border border-gray-300 rounded-md py-1.5 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => openCourseDetails(course.id)}
                >
                  <Eye className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-800">
                    Xem chi tiết
                  </span>
                </div>

                {/* Hai nút duyệt/từ chối */}
                <div className="flex justify-center gap-3 pt-3">
                  <button className="flex items-center gap-1 bg-[#00A651] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#009245] transition">
                    <CheckCircle className="w-4 h-4" />
                    Duyệt
                  </button>
                  <button className="flex items-center gap-1 bg-[#E60000] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#CC0000] transition">
                    <XCircle className="w-4 h-4" />
                    Từ chối
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!loadingPending && !pendingError && pendingCourses.length === 0 && (
            <div className="col-span-full text-center text-sm text-gray-600">Không có khóa học nào đang chờ duyệt</div>
          )}
        </div>
      </section>

      {/* --- Phần đã xử lý --- */}
      <section>
        <h2 className="text-lg font-semibold text-[#0a092d] mb-4">
          Khóa học đã xử lý
        </h2>
        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Ngày duyệt</label>
              <input
                type="date"
                value={approvedDateFilter}
                onChange={(e) => setApprovedDateFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Giảng viên</label>
              <select
                value={approvedInstructorFilter}
                onChange={(e) => setApprovedInstructorFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value="">Tất cả</option>
                {uniqueApprovedInstructors.map((it) => (
                  <option key={it.id} value={it.id}>{it.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => { setApprovedDateFilter(""); setApprovedInstructorFilter(""); }}
              className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
            >Xóa lọc</button>
            <div className="ml-auto text-sm text-gray-700">
              {approvedError ? (
                <span className="text-red-600">{approvedError}</span>
              ) : (
                <span>{loadingApproved ? "Đang tải..." : `Có ${approvedFiltered.length} khóa học đã phê duyệt`}</span>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loadingApproved && !approvedError) && (
            <div className="col-span-full text-center text-sm text-gray-600">Đang tải danh sách...</div>
          )}
          {!loadingApproved && !approvedError && approvedFiltered.length === 0 && (
            <div className="col-span-full text-center text-sm text-gray-600">Không có khóa học nào đã phê duyệt</div>
          )}
          {approvedFiltered.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-56 w-full">
                <img
                  src={sanitizeImageUrl(course.courseImage)}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/file.svg";
                  }}
                />
              </div>

              <div className="p-4 space-y-2">
                <span className="bg-[#00A651] text-white text-xs px-2 py-1 rounded-md">
                  Đã phê duyệt
                </span>
                <h3 className="font-semibold text-[#0a092d] text-base mt-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Giảng viên: {course.instructor.name}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span>Ngày duyệt:</span>
                    <span className="font-medium">{new Date(course.approvalDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Học viên:</span>
                    <span className="font-medium">{course.studentCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Doanh thu:</span>
                    <span className="font-medium">{`${course.revenue} đ`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Đánh giá:</span>
                    <span className="font-medium">{course.rating ?? "Chưa có"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    {detailOpen && (
      <div
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        onClick={closeDetails}
      >
        <div
          className="bg-white w-[min(90vw,900px)] max-h-[85vh] overflow-y-auto rounded-xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-5 py-3 border-b">
            <h3 className="text-lg font-semibold">Chi tiết khóa học</h3>
            <button className="text-gray-600 hover:text-gray-900" onClick={closeDetails}>Đóng</button>
          </div>

          {/* Loading / Error */}
          {detailLoading ? (
            <div className="p-5 text-sm text-gray-600">Đang tải chi tiết...</div>
          ) : detailError ? (
            <div className="p-5 text-sm text-red-600">{detailError}</div>
          ) : detail ? (
            <div className="p-5 space-y-6">
              {/* Media */}
              <div className="w-full h-64 rounded-lg overflow-hidden border">
                <img
                  src={detail.media?.courseImage || "/file.svg"}
                  alt={detail.basicInfo?.title || "Course image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/file.svg";
                  }}
                />
              </div>

              {/* Basic Info */}
              <div>
                <h4 className="font-semibold text-[#0a092d]">Thông tin cơ bản</h4>
                <div className="mt-1 text-sm text-gray-700 space-y-1">
                  <p>Tiêu đề: {detail.basicInfo?.title}</p>
                  <p>Mô tả: {detail.basicInfo?.description}</p>
                  <p>Danh mục: {detail.basicInfo?.category || "(không có)"}</p>
                  <p>Trình độ: {detail.basicInfo?.level || "(không có)"}</p>
                  <p>Ngôn ngữ: {detail.basicInfo?.language || "(không có)"}</p>
                  <p>Giá: {typeof detail.basicInfo?.price === "number" ? `${detail.basicInfo.price} đ` : "(không có)"}</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <h4 className="font-semibold text-[#0a092d]">Nội dung khóa học</h4>
                <div className="mt-1 text-sm text-gray-700 space-y-2">
                  <p>Tổng bài giảng: {detail.content?.lessonCount ?? 0}</p>
                  <p>Tổng thời lượng: {detail.content?.totalDuration || "(không có)"}</p>
                  <div>
                    <p className="font-medium">Yêu cầu đầu vào:</p>
                    {Array.isArray(detail.content?.requirements) && detail.content.requirements.length > 0 ? (
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {detail.content.requirements.map((r, idx) => (
                          <li key={idx}>{r}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">(không có)</p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Syllabus:</p>
                    {Array.isArray(detail.content?.syllabus) && detail.content.syllabus.length > 0 ? (
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {detail.content.syllabus.map((s, idx) => (
                          <li key={idx}>{s.title || `Mục ${idx + 1}`} {s.duration ? `• ${s.duration}` : ""}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">(không có)</p>
                    )}
                  </div>
                  <p>Đối tượng: {detail.content?.targetAudience || "(không có)"}</p>
                </div>
              </div>

              {/* Instructor */}
              <div>
                <h4 className="font-semibold text-[#0a092d]">Giảng viên</h4>
                <div className="mt-1 text-sm text-gray-700 space-y-1">
                  <p>Tên: {detail.instructor?.name}</p>
                  <p>Email: {detail.instructor?.email}</p>
                  <p>Kinh nghiệm: {detail.instructor?.experience ?? "(không có)"} năm</p>
                  <p>Khóa học khác: {detail.instructor?.otherCourses ?? 0}</p>
                </div>
              </div>

              {/* Submission Info */}
              <div>
                <h4 className="font-semibold text-[#0a092d]">Thông tin gửi duyệt</h4>
                <div className="mt-1 text-sm text-gray-700 space-y-1">
                  <p>Ngày gửi: {detail.submissionInfo?.submissionDate ? new Date(detail.submissionInfo.submissionDate).toLocaleString("vi-VN") : "(không có)"}</p>
                  <p>Trạng thái: {detail.submissionInfo?.status || "(không có)"}</p>
                  <p>Ngày dự kiến xuất bản: {detail.submissionInfo?.estimatedLaunchDate ? new Date(detail.submissionInfo.estimatedLaunchDate).toLocaleDateString("vi-VN") : "(không có)"}</p>
                </div>
              </div>

              {/* Actions (placeholder) */}
              <div className="flex justify-end gap-3 pt-2">
                <button className="flex items-center gap-1 bg-[#00A651] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#009245] transition">
                  <CheckCircle className="w-4 h-4" /> Duyệt
                </button>
                <button className="flex items-center gap-1 bg-[#E60000] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#CC0000] transition">
                  <XCircle className="w-4 h-4" /> Từ chối
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 text-sm text-gray-600">Không có dữ liệu chi tiết</div>
          )}
        </div>
      </div>
    )}
    </>
  );
}
