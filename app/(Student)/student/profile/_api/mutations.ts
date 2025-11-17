import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "@/config/axios";

import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type ResetPassword = {
  currentPassword: string;
  newPassword: string;
};

export const useResetPassword = () => {
  const route = useRouter();
  return useMutation({
    mutationFn: async (data: ResetPassword) => {
      return axios.post("/api/Student/reset-password", {
        ...data,
      });
    },
    onSuccess: () => {
      toast({ description: "Mật khẩu đã đổi cần đăng nhập lại" });
      document.cookie =
        "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
      route.push("/Login");
    },
    onError: () => {
      toast({ description: "Đổi không thành công!", variant: "destructive" });
    },
  });
};

export type ApplyInstructorDto = {
  title: string;
  bio: string;
  experience: string;
  portfolioUrl?: string;
  certificateUrl?: string;
};

// Hook gửi đơn đăng ký
export const useApplyInstructor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ApplyInstructorDto) => {
      const res = await axios.post("/api/Student/request-instructor", data);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["instructor-request"] });

      toast({
        title: "Gửi đơn thành công! 🎉",
        description: data.message || "Đơn đăng ký đang chờ admin phê duyệt.",
      });
    },

    onError: (error: any) => {
      toast({
        description: error.response?.data?.message || "Gửi đơn thất bại!",
        variant: "destructive",
      });
    },
  });
};
