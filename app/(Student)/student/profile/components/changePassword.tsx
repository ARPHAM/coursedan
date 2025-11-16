import { useState } from "react";
import { useResetPassword } from "../_api/mutations";

export default function ChangePasswordPage() {
  const resetPassword = useResetPassword();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmit = () =>
    resetPassword.mutate({ currentPassword, newPassword });

  return (
    <form className="flex flex-col mx-auto mt-4 gap-3">
      <input
        type="text"
        placeholder="Current password..."
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="p-2 border-2 border-gray-300"
      />
      <input
        type="text"
        placeholder="New password..."
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="p-2 border-2 border-gray-300"
      />
      <button
        type="button"
        disabled={resetPassword.isPending}
        onClick={() => handleSubmit()}
        className="p-2 border-2 border-gray-300"
      >
        Xác nhận thay đổi
      </button>
    </form>
  );
}
