import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "@/config/axios";

export type DashboardSummary = {
  totalCourses: number;
  publishedCourses: number;
  pendingCourses: number;
  totalStudents: number;
  totalRevenue: number;
};

export const useDashboardSummary = () => {
  return useQuery<DashboardSummary>({
    queryKey: ["DashboardSummary"],
    queryFn: async () => {
      const res = await axios.get("/api/instructor/dashboard/summary");
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
