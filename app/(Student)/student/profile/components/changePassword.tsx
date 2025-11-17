import { useState } from "react";
import { useResetPassword } from "../_api/mutations";

export default function ChangePasswordPage() {
  const resetPassword = useResetPassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = () =>
    resetPassword.mutate({ currentPassword, newPassword });

  return (
    <div className="flex mt-3 px-4 mx-auto">
      <form
        className="w-[500px] bg-white p-6 rounded-2xl shadow-md space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Đổi mật khẩu
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu hiện tại..."
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Mật khẩu mới
          </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          disabled={resetPassword.isPending}
          className="w-full mt-2 bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50"
        >
          {resetPassword.isPending ? "Đang xử lý..." : "Xác nhận thay đổi"}
        </button>
      </form>
    </div>
  );
}
