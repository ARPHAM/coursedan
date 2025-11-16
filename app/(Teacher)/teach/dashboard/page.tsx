"use client";

import { BookOpen, Users, DollarSign, Clock } from "lucide-react";
import { useDashboardSummary } from "./api/queries";

export default function TeacherDashboard() {
  const { data, isLoading, isError } = useDashboardSummary();

  if (isLoading) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }

  if (isError || !data) {
    return <div className="p-6 text-red-500">Lỗi tải dữ liệu.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Tổng khóa học"
          value={data.totalCourses}
          sub="đã xuất bản"
          icon={<BookOpen className="w-5 h-5 text-gray-400" />}
        />

        <DashboardCard
          title="Chờ duyệt"
          value={data.pendingCourses}
          sub="Khóa học chờ kiểm duyệt"
          icon={<Clock className="w-5 h-5 text-gray-400" />}
        />

        <DashboardCard
          title="Học viên"
          value={data.totalStudents}
          sub="Tổng học viên đã mua khóa"
          icon={<Users className="w-5 h-5 text-gray-400" />}
        />

        <DashboardCard
          title="Doanh thu"
          value={data.totalRevenue.toLocaleString() + "đ"}
          sub="Tổng doanh thu"
          icon={<DollarSign className="w-5 h-5 text-gray-400" />}
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  sub,
  icon,
}: {
  title: string;
  value: number | string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border">
      <div className="flex justify-between items-center">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      <p className="text-sm text-gray-500 mt-1">{sub}</p>
    </div>
  );
}
