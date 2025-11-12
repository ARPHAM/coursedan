"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DollarSign, BookOpen, Users, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

// Đảm bảo Recharts đã được cài đặt: npm install recharts

export default function AdminDashboard() {
  const [stats, setStats] = useState<{
    totalRevenue: number;
    currency: string;
    formattedRevenue: string;
    totalStudents: number;
    studentGrowth: number;
    totalTeachers: number;
    teacherGrowth: number;
    totalCourses: number;
    courseGrowth: number;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState<boolean>(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        setStatsError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const res = await fetch("https://coursedan-api.onrender.com/api/admin/dashboard/stats", {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        });
        if (!res.ok) throw new Error(`Failed to load stats (${res.status})`);
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        console.error("Admin stats fetch error:", err);
        setStatsError("Không thể tải thống kê");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);
  // Dữ liệu giả lập
  const revenueData = [
    { month: "T1", revenue: 1200000 },
    { month: "T2", revenue: 900000 },
    { month: "T3", revenue: 1500000 },
    { month: "T4", revenue: 1800000 },
    { month: "T5", revenue: 2500000 },
    { month: "T6", revenue: 3100000 },
  ];

  const userGrowthData = [
    { month: "T1", users: 40 },
    { month: "T2", users: 60 },
    { month: "T3", users: 90 },
    { month: "T4", users: 130 },
    { month: "T5", users: 180 },
    { month: "T6", users: 220 },
  ];

  const courseStatusData = [
    { name: "Đã xuất bản", value: 3 },
    { name: "Chờ duyệt", value: 1 },
    { name: "Từ chối", value: 0 },
  ];
  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  const popularCourses = [
    { name: "Lập trình Web với React", students: 45 },
    { name: "Python cho người mới", students: 35 },
    { name: "Thiết kế UX/UI cơ bản", students: 25 },
  ];

  // --- Teacher statistics API ---
  const [teacherStats, setTeacherStats] = useState<
    | {
        pendingRequests: { count: number; lastRequestDate: string | null };
        totalTeachers: { count: number; activeTeachers: number };
        approvalRate: number; // may be 0..1 or percent
      }
    | null
  >(null);
  const [loadingTeacherStats, setLoadingTeacherStats] = useState<boolean>(false);
  const [teacherStatsError, setTeacherStatsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacherStatistics = async () => {
      try {
        setLoadingTeacherStats(true);
        setTeacherStatsError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const res = await fetch(
          "https://coursedan-api.onrender.com/api/admin/statistics",
          {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
          }
        );
        if (!res.ok) throw new Error(`Failed to load teacher statistics (${res.status})`);
        const json = await res.json();
        setTeacherStats(json);
      } catch (err: any) {
        console.error("Teacher statistics fetch error:", err);
        setTeacherStatsError("Không thể tải thống kê giảng viên");
      } finally {
        setLoadingTeacherStats(false);
      }
    };

    fetchTeacherStatistics();
  }, []);

  // --- Course statistics API ---
  const [courseStats, setCourseStats] = useState<
    | {
        pendingCourses: { count: number; oldestPendingDate: string | null };
        approvedCourses: { count: number; totalRevenue: number };
        rejectedCourses: { count: number };
        averageReviewTime: number;
      }
    | null
  >(null);
  const [loadingCourseStats, setLoadingCourseStats] = useState<boolean>(false);
  const [courseStatsError, setCourseStatsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseStatistics = async () => {
      try {
        setLoadingCourseStats(true);
        setCourseStatsError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const res = await fetch(
          "https://coursedan-api.onrender.com/api/admin/course/statistics",
          {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
          }
        );
        if (!res.ok) throw new Error(`Failed to load course statistics (${res.status})`);
        const json = await res.json();
        setCourseStats(json);
      } catch (err: any) {
        console.error("Course statistics fetch error:", err);
        setCourseStatsError("Không thể tải thống kê khóa học");
      } finally {
        setLoadingCourseStats(false);
      }
    };

    fetchCourseStatistics();
  }, []);

  // --- Popular courses chart from API ---
  const [popularCoursesChart, setPopularCoursesChart] = useState<
    { courseName: string; studentCount: number; courseId: number; category: string | null }[]
  >([]);
  const [loadingPopular, setLoadingPopular] = useState<boolean>(false);
  const [popularError, setPopularError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        setLoadingPopular(true);
        setPopularError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const res = await fetch(
          "https://coursedan-api.onrender.com/api/admin/popular-courses-chart",
          {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
          }
        );
        if (!res.ok) throw new Error(`Failed to load popular courses (${res.status})`);
        const json = await res.json();
        const apiData = Array.isArray(json?.data) ? json.data : [];
        setPopularCoursesChart(apiData);
      } catch (err: any) {
        console.error("Popular courses fetch error:", err);
        setPopularError("Không thể tải khóa học phổ biến");
      } finally {
        setLoadingPopular(false);
      }
    };

    fetchPopularCourses();
  }, []);

  const popularCoursesDisplayData = popularCoursesChart.length
    ? popularCoursesChart.map((c) => ({ name: c.courseName, students: c.studentCount }))
    : popularCourses;

  // --- User growth chart from API ---
  const [userGrowthChart, setUserGrowthChart] = useState<
    { month: string; newUsers: number; cumulativeUsers: number }[]
  >([]);
  const [loadingUserGrowth, setLoadingUserGrowth] = useState<boolean>(false);
  const [userGrowthError, setUserGrowthError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserGrowth = async () => {
      try {
        setLoadingUserGrowth(true);
        setUserGrowthError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const res = await fetch(
          "https://coursedan-api.onrender.com/api/admin/user-growth-chart",
          {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
          }
        );
        if (!res.ok) throw new Error(`Failed to load user growth (${res.status})`);
        const json = await res.json();
        const apiData = Array.isArray(json?.data) ? json.data : [];
        setUserGrowthChart(apiData);
      } catch (err: any) {
        console.error("User growth fetch error:", err);
        setUserGrowthError("Không thể tải tăng trưởng người dùng");
      } finally {
        setLoadingUserGrowth(false);
      }
    };

    fetchUserGrowth();
  }, []);

  const userGrowthDisplayData = userGrowthChart.length
    ? userGrowthChart.map((d) => ({ month: d.month, users: d.cumulativeUsers }))
    : userGrowthData;

  // --- Revenue chart from API ---
  const [revenueChart, setRevenueChart] = useState<
    { month: string; monthValue: string; revenue: number; orderCount: number }[]
  >([]);
  const [loadingRevenue, setLoadingRevenue] = useState<boolean>(false);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenueChart = async () => {
      try {
        setLoadingRevenue(true);
        setRevenueError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const res = await fetch(
          "https://coursedan-api.onrender.com/api/admin/dashboard/revenue-chart",
          {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
          }
        );
        if (!res.ok) throw new Error(`Failed to load revenue chart (${res.status})`);
        const json = await res.json();
        const apiData = Array.isArray(json?.data) ? json.data : [];
        setRevenueChart(apiData);
      } catch (err: any) {
        console.error("Revenue chart fetch error:", err);
        setRevenueError("Không thể tải biểu đồ doanh thu");
      } finally {
        setLoadingRevenue(false);
      }
    };

    fetchRevenueChart();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Dashboard Quản trị</h1>

      {/* --- Cards thống kê (Vẫn giữ 4 cột nhỏ) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tổng doanh thu"
          value={loadingStats ? "Đang tải..." : stats?.formattedRevenue || "0 đ"}
          icon={<DollarSign className="text-green-500" />}
        />
        <StatCard
          title="Học viên"
          value={loadingStats ? "Đang tải..." : String(stats?.totalStudents ?? 0)}
          icon={<Users className="text-blue-500" />}
        />
        <StatCard
          title="Giảng viên"
          value={
            loadingTeacherStats
              ? "Đang tải..."
              : String(
                  teacherStats?.totalTeachers?.count ?? stats?.totalTeachers ?? 0
                )
          }
          subtitle={
            !loadingTeacherStats && teacherStats
              ? `Hoạt động: ${teacherStats.totalTeachers.activeTeachers} • Pending: ${teacherStats.pendingRequests.count}` +
                (typeof teacherStats.approvalRate === "number"
                  ? ` • Duyệt: ${
                      teacherStats.approvalRate <= 1
                        ? Math.round(teacherStats.approvalRate * 100)
                        : Math.round(teacherStats.approvalRate)
                    }%`
                  : "") +
                (teacherStats.pendingRequests.lastRequestDate
                  ? ` • Gần nhất: ${new Date(
                      teacherStats.pendingRequests.lastRequestDate
                    ).toLocaleDateString("vi-VN")}`
                  : "")
              : undefined
          }
          icon={<UserCheck className="text-purple-500" />}
        />
        <StatCard
          title="Khóa học"
          value={loadingStats ? "Đang tải..." : String(stats?.totalCourses ?? 0)}
          subtitle={
            !loadingCourseStats && courseStats
              ? `Chờ: ${courseStats.pendingCourses.count} • Đã duyệt: ${courseStats.approvedCourses.count} • Từ chối: ${courseStats.rejectedCourses.count}` +
                (typeof courseStats.averageReviewTime === "number"
                  ? ` • TB duyệt: ${Math.round(courseStats.averageReviewTime)} giờ`
                  : "") +
                (courseStats.pendingCourses.oldestPendingDate
                  ? ` • Cũ nhất: ${new Date(
                      courseStats.pendingCourses.oldestPendingDate
                    ).toLocaleDateString("vi-VN")}`
                  : "")
              : courseStatsError || undefined
          }
          icon={<BookOpen className="text-orange-500" />}
        />
      </div>

      {/* --- 3 biểu đồ: Doanh thu, Tăng trưởng người dùng, Khóa học phổ biến --- */}
      <div className="grid grid-cols-1 gap-8 mb-8">
        {/* Doanh thu theo tháng */}
        <ChartCard title="Doanh thu theo tháng">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChart.length ? revenueChart : revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Tăng trưởng người dùng */}
        <ChartCard title="Tăng trưởng người dùng">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthDisplayData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Khóa học phổ biến */}
        <ChartCard title="Khóa học phổ biến">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart layout="vertical" data={popularCoursesDisplayData} margin={{ top: 8, right: 32, bottom: 8, left: 160 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 14 }} />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// Component phụ StatCard (vẫn giữ nguyên)
function StatCard({ title, value, icon, subtitle }: { title: string; value: string; icon: React.ReactNode; subtitle?: string }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {subtitle ? (
          <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
        ) : null}
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
}

// Component phụ ChartCard (vẫn giữ nguyên)
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}