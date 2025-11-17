"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetInstructorProfile } from "./api/queries";
import { useUpdateInstructorProfile, UpdateProfileDto } from "./api/mutation";

type FormValues = UpdateProfileDto;

export default function ProfilePage() {
  // 1. Lấy dữ liệu profile
  const { 
    data: profile, 
    isLoading: isLoadingProfile,
    error: profileError 
  } = useGetInstructorProfile();

  // 2. Mutation để update (PUT API tự động tạo mới nếu chưa có)
  const mutation = useUpdateInstructorProfile();

  // 3. React Hook Form
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors, isDirty }
  } = useForm<FormValues>();

  // 4. Đồng bộ data từ API vào form (chỉ khi đã có profile)
  useEffect(() => {
    if (profile) {
      setValue("title", profile.title || "");
      setValue("bio", profile.bio || "");
      setValue("experience", profile.experience || "");
      setValue("portfolioUrl", profile.portfolioUrl || "");
      setValue("certificateUrl", profile.certificateUrl || "");
    }
  }, [profile, setValue]);

  // 5. Submit handler
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data);
  };

  // 6. Loading state
  if (isLoadingProfile) {
    return (
      <div className="max-w-3xl mx-auto p-8 mt-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // 7. Error state (lỗi thực sự, không phải 404)
  if (profileError && !profile) {
    return (
      <div className="max-w-3xl mx-auto p-8 mt-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">Không thể tải hồ sơ</p>
          <p className="text-red-600 text-sm mt-1">
            Vui lòng thử lại sau hoặc liên hệ hỗ trợ.
          </p>
        </div>
      </div>
    );
  }

  // 8. No profile state - Form đăng ký làm giảng viên
  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-8 mt-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Đăng ký trở thành giảng viên
          </h1>
          <p className="text-gray-600">
            Điền thông tin để gửi đơn đăng ký. Admin sẽ xem xét và phê duyệt trong vòng 24-48h.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
              Chức danh <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              {...register("title", { 
                required: "Vui lòng nhập chức danh",
                minLength: { value: 3, message: "Tối thiểu 3 ký tự" }
              })}
              type="text"
              placeholder="VD: Chuyên gia ReactJS, Lập trình viên Backend..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1 text-gray-700">
              Giới thiệu bản thân <span className="text-red-500">*</span>
            </label>
            <textarea
              id="bio"
              rows={4}
              {...register("bio", { 
                required: "Vui lòng giới thiệu về bản thân",
                minLength: { value: 20, message: "Tối thiểu 20 ký tự" }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Giới thiệu ngắn về bản thân, kinh nghiệm giảng dạy..."
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium mb-1 text-gray-700">
              Kinh nghiệm & Chuyên môn <span className="text-red-500">*</span>
            </label>
            <textarea
              id="experience"
              rows={4}
              {...register("experience", { 
                required: "Vui lòng mô tả kinh nghiệm",
                minLength: { value: 20, message: "Tối thiểu 20 ký tự" }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="VD: 5 năm giảng dạy React, Node.js. Chuyên môn về Web Development..."
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="portfolioUrl" className="block text-sm font-medium mb-1 text-gray-700">
              LinkedIn hoặc Portfolio URL
            </label>
            <input
              id="portfolioUrl"
              type="url"
              {...register("portfolioUrl", {
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "URL phải bắt đầu bằng http:// hoặc https://"
                }
              })}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.portfolioUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.portfolioUrl.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="certificateUrl" className="block text-sm font-medium mb-1 text-gray-700">
              Chứng chỉ (URL)
            </label>
            <input
              id="certificateUrl"
              type="url"
              {...register("certificateUrl", {
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "URL phải bắt đầu bằng http:// hoặc https://"
                }
              })}
              placeholder="https://drive.google.com/your-certificate"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.certificateUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.certificateUrl.message}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang gửi...
                </span>
              ) : "Gửi đơn đăng ký"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // === 9. Có profile rồi - Form cập nhật ===
  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-8 mt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Hồ sơ giảng viên
        </h1>
        <p className="text-gray-600 mt-1">
          Cập nhật thông tin cá nhân của bạn để hiển thị trên trang khóa học.
        </p>
        
        {/* Status Badge */}
        <div className="mt-3">
          {profile.status === "Approved" && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✓ Đã phê duyệt - Bạn có thể tạo khóa học
            </span>
          )}
        
          {profile.status === "Rejected" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <span className="inline-flex items-center text-sm font-medium text-red-800">
                ✗ Đơn bị từ chối
              </span>
              {profile.rejectReason && (
                <p className="text-red-700 text-sm mt-1">
                  <strong>Lý do:</strong> {profile.rejectReason}
                </p>
              )}
              <p className="text-red-600 text-sm mt-1">
                Vui lòng cập nhật thông tin và gửi lại.
              </p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* === Thông tin không thể sửa === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              readOnly
              value={profile.fullName}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              readOnly
              value={profile.email}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        {/* === Các trường có thể sửa === */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
            Chức danh <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            {...register("title", { 
              required: "Vui lòng nhập chức danh",
              minLength: { value: 3, message: "Tối thiểu 3 ký tự" }
            })}
            type="text"
            placeholder="VD: Chuyên gia ReactJS, Lập trình viên backend..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1 text-gray-700">
            Giới thiệu bản thân
          </label>
          <textarea
            id="bio"
            rows={4}
            {...register("bio")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Giới thiệu ngắn về bản thân, kinh nghiệm giảng dạy..."
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium mb-1 text-gray-700">
            Kinh nghiệm & Chuyên môn
          </label>
          <textarea
            id="experience"
            rows={4}
            {...register("experience")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="VD: 5 năm giảng dạy React. Chuyên môn về AI..."
          />
        </div>

        <div>
          <label htmlFor="portfolioUrl" className="block text-sm font-medium mb-1 text-gray-700">
            LinkedIn URL (hoặc Portfolio)
          </label>
          <input
            id="portfolioUrl"
            type="url"
            {...register("portfolioUrl", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "URL phải bắt đầu bằng http:// hoặc https://"
              }
            })}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.portfolioUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.portfolioUrl.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="certificateUrl" className="block text-sm font-medium mb-1 text-gray-700">
            Chứng chỉ (URL)
          </label>
          <input
            id="certificateUrl"
            type="url"
            {...register("certificateUrl", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "URL phải bắt đầu bằng http:// hoặc https://"
              }
            })}
            placeholder="https://example.com/certificate.pdf"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.certificateUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.certificateUrl.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={mutation.isPending || !isDirty}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang lưu...
              </span>
            ) : "Lưu thay đổi"}
          </button>
          
          {isDirty && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}