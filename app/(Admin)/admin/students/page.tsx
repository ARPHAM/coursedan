"use client";

import { useEffect, useState } from "react";

type Student = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  registeredAt: string;
};

type EnrollmentCourse = {
  courseId: number;
  courseTitle: string;
  enrolledAt: string;
  isCompleted: boolean;
};

type EnrollmentItem = {
  studentId: string;
  email: string;
  username: string;
  fullName: string;
  registeredAt: string;
  courses: EnrollmentCourse[];
};

export default function AdminStudentsPage() {
  // --- Students ---
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(false);
  const [studentsError, setStudentsError] = useState<string | null>(null);
  const [studentSearch, setStudentSearch] = useState<string>("");

  // --- Enrollments ---
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState<boolean>(false);
  const [enrollmentsError, setEnrollmentsError] = useState<string | null>(null);
  const [enrollmentSearch, setEnrollmentSearch] = useState<string>("");
  const [openStudentId, setOpenStudentId] = useState<string | null>(null);

  const formatDate = (s?: string) => {
    if (!s) return "";
    const d = new Date(s);
    if (isNaN(d.getTime())) return s || "";
    const date = d.toLocaleDateString("vi-VN");
    const time = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    return `${date} ${time}`;
  };

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);
      setStudentsError(null);
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
      const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

      const res = await fetch("https://coursedan-api.onrender.com/api/admin/students", {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      });
      if (!res.ok) throw new Error(`Failed to load students (${res.status})`);
      const data = await res.json();
      const items: Student[] = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
      setStudents(items);
    } catch (err: any) {
      console.warn("Students fetch error:", err?.message ?? err);
      setStudentsError("Không thể tải danh sách học viên");
    } finally {
      setLoadingStudents(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      setLoadingEnrollments(true);
      setEnrollmentsError(null);
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
      const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

      const res = await fetch("https://coursedan-api.onrender.com/api/admin/students/enrollments", {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      });
      if (!res.ok) throw new Error(`Failed to load enrollments (${res.status})`);
      const data = await res.json();
      const items: EnrollmentItem[] = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
      setEnrollments(items);
    } catch (err: any) {
      console.warn("Enrollments fetch error:", err?.message ?? err);
      setEnrollmentsError("Không thể tải danh sách đăng ký khóa học");
    } finally {
      setLoadingEnrollments(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchEnrollments();
  }, []);

  const filteredStudents = students.filter((s) => {
    const q = studentSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      (s.fullName || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q) ||
      (s.username || "").toLowerCase().includes(q)
    );
  });

  const filteredEnrollments = enrollments.filter((e) => {
    const q = enrollmentSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      (e.fullName || "").toLowerCase().includes(q) ||
      (e.email || "").toLowerCase().includes(q) ||
      (e.username || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-[#0a092d]">Quản lý Học viên</h1>

      {/* --- Students table --- */}
      <section>
        <h2 className="text-lg font-semibold text-[#0a092d] mb-3">Danh sách học viên</h2>
        <div className="bg-white rounded-xl shadow-md p-4 border">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="text"
              placeholder="Tìm theo tên, email, username..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full sm:w-96 border rounded-md px-3 py-2 text-sm"
            />
            <div className="text-sm text-gray-700 ml-auto">
              {studentsError ? (
                <span className="text-red-600">{studentsError}</span>
              ) : (
                <span>{loadingStudents ? "Đang tải..." : `Có ${filteredStudents.length} học viên`}</span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3 text-left">Họ tên</th>
                  <th className="px-3 text-left">Email</th>
                  <th className="px-3 text-left">Username</th>
                  <th className="px-3 text-left">Ngày đăng ký</th>
                </tr>
              </thead>
              <tbody>
                {loadingStudents ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-600">Đang tải...</td>
                  </tr>
                ) : studentsError ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-red-600">{studentsError}</td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-600">Không có học viên</td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="py-2 px-3">{s.fullName || "(không tên)"}</td>
                      <td className="px-3">{s.email}</td>
                      <td className="px-3">{s.username}</td>
                      <td className="px-3">{formatDate(s.registeredAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- Enrollments table --- */}
      <section>
        <h2 className="text-lg font-semibold text-[#0a092d] mb-3">Học viên đã đăng ký khóa học</h2>
        <div className="bg-white rounded-xl shadow-md p-4 border">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="text"
              placeholder="Tìm theo tên, email, username..."
              value={enrollmentSearch}
              onChange={(e) => setEnrollmentSearch(e.target.value)}
              className="w-full sm:w-96 border rounded-md px-3 py-2 text-sm"
            />
            <div className="text-sm text-gray-700 ml-auto">
              {enrollmentsError ? (
                <span className="text-red-600">{enrollmentsError}</span>
              ) : (
                <span>{loadingEnrollments ? "Đang tải..." : `Có ${filteredEnrollments.length} học viên đã đăng ký`}</span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3 text-left">Họ tên</th>
                  <th className="px-3 text-left">Email</th>
                  <th className="px-3 text-left">Username</th>
                  <th className="px-3 text-left">Ngày đăng ký</th>
                  <th className="px-3 text-center">Số khóa học</th>
                  <th className="px-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {loadingEnrollments ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-600">Đang tải...</td>
                  </tr>
                ) : enrollmentsError ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-red-600">{enrollmentsError}</td>
                  </tr>
                ) : filteredEnrollments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-600">Không có dữ liệu đăng ký</td>
                  </tr>
                ) : (
                  filteredEnrollments.map((e) => (
                    <>
                      <tr key={e.studentId} className="border-t">
                        <td className="py-2 px-3">{e.fullName || "(không tên)"}</td>
                        <td className="px-3">{e.email}</td>
                        <td className="px-3">{e.username}</td>
                        <td className="px-3">{formatDate(e.registeredAt)}</td>
                        <td className="px-3 text-center">{e.courses?.length ?? 0}</td>
                        <td className="px-3 text-center">
                          <button
                            onClick={() => setOpenStudentId((prev) => (prev === e.studentId ? null : e.studentId))}
                            className="px-3 py-1 text-xs rounded-md border hover:bg-gray-50"
                          >
                            {openStudentId === e.studentId ? "Đóng" : "Xem"}
                          </button>
                        </td>
                      </tr>
                      {openStudentId === e.studentId && (
                        <tr key={`${e.studentId}-courses`} className="bg-gray-50">
                          <td colSpan={6} className="p-3">
                            <div className="overflow-x-auto">
                              <table className="w-full table-auto">
                                <thead>
                                  <tr>
                                    <th className="py-2 px-3 text-left">Khóa học</th>
                                    <th className="px-3 text-left">Ngày đăng ký</th>
                                    <th className="px-3 text-left">Hoàn thành</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(e.courses || []).map((c, idx) => (
                                    <tr key={`${e.studentId}-${c.courseId}-${idx}`} className="border-t">
                                      <td className="py-2 px-3">{c.courseTitle}</td>
                                      <td className="px-3">{formatDate(c.enrolledAt)}</td>
                                      <td className="px-3">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${c.isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                          {c.isCompleted ? "Đã hoàn thành" : "Đang học"}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}