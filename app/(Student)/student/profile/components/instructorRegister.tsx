"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft, CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetInstructorRequest } from "../_api/queries";
import { useApplyInstructor, ApplyInstructorDto } from "../_api/mutations";

type FormValues = ApplyInstructorDto;

export default function InstructorRegister() {
  const router = useRouter();
  const { data: request, isLoading } = useGetInstructorRequest();
  const applyMutation = useApplyInstructor();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    applyMutation.mutate(data, {
      onSuccess: () => {
        // Refresh để hiển thị status
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
    });
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ===== ĐÃ GỬI ĐƠN - HIỂN THỊ TRẠNG THÁI =====

  if (request) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="w-full mx-auto">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            {/* PENDING */}
            {request.status === "Pending" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-yellow-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Đơn đang chờ duyệt
                </h1>
                <p className="text-gray-600 mb-6">
                  Đơn đăng ký làm giảng viên của bạn đang được admin xem xét.
                  <br />
                  Thời gian xử lý thường là 24-48 giờ.
                </p>

                {/* Thông tin đã gửi */}
                <div className="bg-gray-50 rounded-lg p-6 text-left mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Thông tin đã gửi:
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Chức danh:</span>
                      <p className="text-gray-900 font-medium">
                        {request.title}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Giới thiệu:</span>
                      <p className="text-gray-900">{request.bio}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Kinh nghiệm:</span>
                      <p className="text-gray-900">{request.experience}</p>
                    </div>
                    {request.portfolioUrl && (
                      <div>
                        <span className="text-gray-600">Portfolio:</span>
                        <a
                          href={request.portfolioUrl}
                          target="_blank"
                          className="text-blue-600 hover:underline block"
                        >
                          {request.portfolioUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* APPROVED */}
            {request.status === "Approved" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Chúc mừng! Đơn đã được duyệt
                </h1>
                <p className="text-gray-600 mb-6">
                  Bạn đã chính thức trở thành giảng viên.
                  <br />
                  Giờ đây bạn có thể tạo và quản lý khóa học của mình!
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Về Dashboard
                  </button>
                  <button
                    onClick={() => router.push("/teach/create")}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Tạo khóa học đầu tiên
                  </button>
                </div>
              </div>
            )}

            {/* REJECTED */}
            {request.status === "Rejected" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Đơn bị từ chối
                </h1>
                <p className="text-gray-600 mb-4">
                  Rất tiếc, đơn đăng ký của bạn chưa được phê duyệt.
                </p>

                {/* Lý do từ chối */}
                {request.rejectReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm font-semibold text-red-800 mb-1">
                      Lý do từ chối:
                    </p>
                    <p className="text-red-700">{request.rejectReason}</p>
                  </div>
                )}

                <p className="text-gray-600 mb-6">
                  Bạn có thể liên hệ admin để biết thêm chi tiết hoặc cải thiện
                  hồ sơ và đăng ký lại sau.
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Về Dashboard
                  </button>
                  <button
                    onClick={() => router.push("/contact")}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Liên hệ Admin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== CHƯA GỬI ĐƠN - HIỂN THỊ FORM ĐĂNG KÝ =====

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="w-full mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Đăng ký trở thành giảng viên
            </h1>
            <p className="text-gray-600">
              Vui lòng cung cấp thông tin về kinh nghiệm và chuyên môn của bạn.
              Admin sẽ xem xét và phản hồi trong vòng 24-48 giờ.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Chức danh / Nghề nghiệp <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                {...register("title", {
                  required: "Vui lòng nhập chức danh",
                  minLength: { value: 5, message: "Tối thiểu 5 ký tự" },
                })}
                type="text"
                placeholder="VD: Lập trình viên Backend, Chuyên gia AI..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Giới thiệu bản thân <span className="text-red-500">*</span>
              </label>
              <textarea
                id="bio"
                {...register("bio", {
                  required: "Vui lòng giới thiệu về bản thân",
                  minLength: { value: 50, message: "Tối thiểu 50 ký tự" },
                })}
                rows={4}
                placeholder="Giới thiệu ngắn về bản thân, kỹ năng, sở thích giảng dạy..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Kinh nghiệm giảng dạy / Chuyên môn{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="experience"
                {...register("experience", {
                  required: "Vui lòng mô tả kinh nghiệm",
                  minLength: { value: 30, message: "Tối thiểu 30 ký tự" },
                })}
                rows={4}
                placeholder="VD: 3 năm giảng dạy lập trình web tại trung tâm ABC, chuyên về React và Node.js..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Portfolio */}
            <div>
              <label
                htmlFor="portfolioUrl"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Portfolio / LinkedIn / Website
              </label>
              <input
                id="portfolioUrl"
                {...register("portfolioUrl", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "URL phải bắt đầu bằng http:// hoặc https://",
                  },
                })}
                type="url"
                placeholder="https://yourportfolio.com hoặc https://linkedin.com/in/yourname"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.portfolioUrl && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.portfolioUrl.message}
                </p>
              )}
            </div>

            {/* Certificate */}
            <div>
              <label
                htmlFor="certificateUrl"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Chứng chỉ / Bằng cấp (URL)
              </label>
              <input
                id="certificateUrl"
                {...register("certificateUrl", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "URL phải bắt đầu bằng http:// hoặc https://",
                  },
                })}
                type="url"
                placeholder="https://drive.google.com/your-certificate"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.certificateUrl && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.certificateUrl.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                disabled={applyMutation.isPending}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={applyMutation.isPending}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {applyMutation.isPending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  "Gửi đơn đăng ký"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
