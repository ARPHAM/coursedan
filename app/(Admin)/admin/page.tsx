"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { DollarSign, BookOpen, Users, UserCheck } from "lucide-react";

// Đảm bảo Recharts đã được cài đặt: npm install recharts

export default function AdminDashboard() {
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

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Dashboard Quản trị</h1>

      {/* --- Cards thống kê (Vẫn giữ 4 cột nhỏ) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Tổng doanh thu" value="0 đ" icon={<DollarSign className="text-green-500" />} />
        <StatCard title="Học viên" value="1" icon={<Users className="text-blue-500" />} />
        <StatCard title="Giảng viên" value="1" icon={<UserCheck className="text-purple-500" />} />
        <StatCard title="Khóa học" value="3" icon={<BookOpen className="text-orange-500" />} />
      </div>

      {/* --- Biểu đồ: SỬA LẠI THÀNH 4 HÀNG DỌC --- */}
      <div className="grid grid-cols-1 gap-8 mb-8">
        
        {/* Hàng 1: Doanh thu theo tháng */}
        <ChartCard title="Doanh thu theo tháng">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Hàng 2: Tăng trưởng người dùng */}
        <ChartCard title="Tăng trưởng người dùng">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        {/* Hàng 3: Khóa học phổ biến */}
        <ChartCard title="Khóa học phổ biến">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={popularCourses}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Hàng 4: Trạng thái khóa học */}
        <ChartCard title="Trạng thái khóa học">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {courseStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// Component phụ StatCard (vẫn giữ nguyên)
function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
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