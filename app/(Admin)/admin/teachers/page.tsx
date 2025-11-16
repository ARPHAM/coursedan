"use client";

import { useEffect, useState } from "react";

type TeacherRequest = {
  id: number;
  applicantName: string;
  email: string;
  applicationReason: string;
  submissionDate: string;
  status: string;
  reviewDeadline: string;
};

type TeacherRequestDetail = {
  id: number;
  applicantInfo: {
    name: string;
    email: string;
    phone: string | null;
    cvUrl: string | null;
  };
  applicationDetails: {
    reason: string;
    expertise: string[];
    teachingExperience: string | null;
    preferredCategories: string[];
  };
  submissionDate: string;
  status: string;
};

export default function TeacherRequestsPage() {
  const [requests, setRequests] = useState<TeacherRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [hasNext, setHasNext] = useState<boolean>(false);

  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<TeacherRequestDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [approveLoading, setApproveLoading] = useState<number | null>(null); // id đang duyệt
  const [approveError, setApproveError] = useState<string | null>(null);

  // Reject state
  const [rejectLoading, setRejectLoading] = useState<number | null>(null);
  const [rejectError, setRejectError] = useState<string | null>(null);
  const [rejectOpen, setRejectOpen] = useState<boolean>(false);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
        const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

        const url = `https://coursedan-api.onrender.com/api/admin/teacher/requests?page=${page}&limit=${limit}`;
        const res = await fetch(url, {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        });
        if (!res.ok) {
          throw new Error(`Failed to load teacher requests (${res.status})`);
        }
        const data = await res.json();
        const items: TeacherRequest[] = Array.isArray(data?.items) ? data.items : [];
        setRequests(items);
        setHasNext(items.length === limit);
      } catch (err: any) {
        setError("Không thể tải yêu cầu giảng viên");
        console.warn("Teacher requests fetch error:", err?.message ?? err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [page, limit]);

  const openDetails = async (id: number) => {
    try {
      setLoadingDetail(true);
      setDetailError(null);
      setDetail(null);
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
      const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;

      const url = `https://coursedan-api.onrender.com/api/admin/requests/${id}/details`;
      const res = await fetch(url, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      });
      if (!res.ok) {
        setDetailError(`Không thể tải chi tiết (HTTP ${res.status})`);
        setDetailOpen(true);
        return;
      }
      const data = await res.json();
      setDetail(data as TeacherRequestDetail);
      setDetailOpen(true);
    } catch (err: any) {
      console.warn("Teacher request detail fetch error:", err?.message ?? err);
      setDetailError("Không thể tải chi tiết yêu cầu");
      setDetailOpen(true);
    } finally {
      setLoadingDetail(false);
    }
  };

  const nextPage = () => {
    if (hasNext && !loading) setPage((p) => p + 1);
  };
  const prevPage = () => {
    if (page > 1 && !loading) setPage((p) => p - 1);
  };

  const approveRequest = async (id: number) => {
    try {
      setApproveLoading(id);
      setApproveError(null);
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
      const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;
      if (!accessToken) throw new Error("Thiếu token");

      const res = await fetch(`https://coursedan-api.onrender.com/api/admin/instructor-requests/${id}/approve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`Duyệt thất bại (${res.status})`);

      const data = await res.json();
      // Cập nhật lại danh sách: loại khỏi pending
      setRequests((prev) => prev.filter((r) => r.id !== id));
      if (detail?.id === id) setDetailOpen(false);
      alert(`Đã phê duyệt yêu cầu #${data.requestId} – user được cấp quyền ${data.grantedRole}`);
    } catch (err: any) {
      setApproveError(err?.message ?? "Lỗi khi duyệt");
      alert("Duyệt thất bại: " + (err?.message ?? "Lỗi không xác định"));
    } finally {
      setApproveLoading(null);
    }
  };

  const openReject = (id: number) => {
    setRejectId(id);
    setRejectReason("");
    setRejectError(null);
    setRejectOpen(true);
  };

  const submitReject = async () => {
    if (!rejectId) return;
    try {
      setRejectLoading(rejectId);
      setRejectError(null);
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
      const accessToken = match ? decodeURIComponent(match.split("=")[1]) : undefined;
      if (!accessToken) throw new Error("Thiếu token");

      const endpoint = `https://coursedan-api.onrender.com/api/admin/instructor-requests/${rejectId}/reject`;

      // Try with different payload shapes to avoid 400 due to validation differences
      const attempts = [
        { method: "POST", body: { rejectReason } },
        { method: "POST", body: { reason: rejectReason } },
        { method: "PATCH", body: { rejectReason } },
      ];

      let lastError: any = null;
      let data: any = null;
      for (const attempt of attempts) {
        try {
          const res = await fetch(endpoint, {
            method: attempt.method,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(attempt.body),
          });
          if (res.ok) {
            data = await res.json();
            lastError = null;
            break;
          } else {
            let detail = "";
            try {
              const errJson = await res.json();
              detail = errJson?.message || errJson?.error || JSON.stringify(errJson);
            } catch {
              detail = await res.text();
            }
            lastError = new Error(`HTTP ${res.status} – ${detail || "Từ chối thất bại"}`);
          }
        } catch (err) {
          lastError = err;
        }
      }

      if (lastError) throw lastError;

      // Loại yêu cầu khỏi danh sách
      setRequests((prev) => prev.filter((r) => r.id !== rejectId));
      // Đóng chi tiết nếu đang mở cho id này
      if (detail?.id === rejectId) setDetailOpen(false);
      setRejectOpen(false);
      alert(`Đã từ chối yêu cầu #${data?.requestId ?? rejectId} – lý do: ${data?.rejectReason || data?.reason || rejectReason}`);
    } catch (err: any) {
      setRejectError(err?.message ?? "Lỗi khi từ chối");
    } finally {
      setRejectLoading(null);
    }
  };

  const formatDate = (s?: string) => {
    if (!s) return "";
    const d = new Date(s);
    if (isNaN(d.getTime())) return s || "";
    const date = d.toLocaleDateString("vi-VN");
    const time = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    return `${date} ${time}`;
  };

  return (
    <>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Yêu cầu trở thành giảng viên</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-3 text-left">Họ tên</th>
              <th className="px-3 text-left">Email</th>
              <th className="px-3 text-left">Lý do</th>
              <th className="px-3 text-left">Ngày gửi</th>
              <th className="px-3 text-left">Hạn duyệt</th>
              <th className="px-3 text-left">Trạng thái</th>
              <th className="px-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-600">
                  Đang tải...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-red-600">
                  {error}
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-600">
                  Không có yêu cầu pending
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="py-2 px-3">{req.applicantName}</td>
                  <td className="px-3">{req.email}</td>
                  <td className="px-3">{req.applicationReason}</td>
                  <td className="px-3">{formatDate(req.submissionDate)}</td>
                  <td className="px-3">{formatDate(req.reviewDeadline)}</td>
                  <td className="px-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      {req.status}
                    </span>
                  </td>
                  <td className="px-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openDetails(req.id)}
                        className="px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => approveRequest(req.id)}
                        disabled={approveLoading === req.id}
                        className="px-3 py-1 text-xs rounded-md bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-50"
                      >
                        {approveLoading === req.id ? "Đang duyệt..." : "Phê duyệt"}
                      </button>
                      <button
                        onClick={() => openReject(req.id)}
                        className="px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Từ chối
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Trang {page}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={page === 1 || loading}
            className={`px-3 py-1 rounded-md border ${
              page === 1 || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            Trước
          </button>
          <button
            onClick={nextPage}
            disabled={!hasNext || loading}
            className={`px-3 py-1 rounded-md border ${
              !hasNext || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
    {detailOpen && (
      <div
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        onClick={() => setDetailOpen(false)}
      >
        <div
          className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setDetailOpen(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            aria-label="Đóng"
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mb-4">Chi tiết yêu cầu giảng viên</h2>
          {loadingDetail ? (
            <p className="text-gray-600">Đang tải...</p>
          ) : detailError ? (
            <p className="text-red-600">{detailError}</p>
          ) : detail ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Thông tin người nộp</h3>
                <div className="mt-1 text-sm text-gray-700">
                  <p>Tên: {detail.applicantInfo.name}</p>
                  <p>Email: {detail.applicantInfo.email}</p>
                  <p>Điện thoại: {detail.applicantInfo.phone || "(không có)"}</p>
                  <p>
                    CV: {detail.applicantInfo.cvUrl ? (
                      <a
                        href={detail.applicantInfo.cvUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Xem CV
                      </a>
                    ) : (
                      "(không có)"
                    )}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Chi tiết yêu cầu</h3>
                <div className="mt-1 text-sm text-gray-700 space-y-2">
                  <p>Lý do: {detail.applicationDetails.reason || "(không có)"}</p>
                  <div>
                    Chuyên môn:
                    <span className="ml-2 inline-flex flex-wrap gap-2">
                      {(detail.applicationDetails.expertise || []).length > 0 ? (
                        detail.applicationDetails.expertise.map((ex, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs">
                            {ex}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">(không có)</span>
                      )}
                    </span>
                  </div>
                  <p>Kinh nghiệm giảng dạy: {detail.applicationDetails.teachingExperience || "(không có)"}</p>
                  <div>
                    Danh mục ưu tiên:
                    <span className="ml-2 inline-flex flex-wrap gap-2">
                      {(detail.applicationDetails.preferredCategories || []).length > 0 ? (
                        detail.applicationDetails.preferredCategories.map((c, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs">
                            {c}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">(không có)</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <p>Ngày gửi: {formatDate(detail.submissionDate)}</p>
                <p>Trạng thái: <span className="font-medium">{detail.status}</span></p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => detail && approveRequest(detail.id)}
                  disabled={!detail || approveLoading === detail.id}
                  className="px-3 py-1 text-xs rounded-md bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-50"
                >
                  {approveLoading === detail?.id ? "Đang duyệt..." : "Phê duyệt"}
                </button>
                <button
                  onClick={() => detail && openReject(detail.id)}
                  className="px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Từ chối
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Không có dữ liệu chi tiết</p>
          )}
        </div>
      </div>
    )}
    {rejectOpen && (
      <div
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        onClick={() => setRejectOpen(false)}
      >
        <div
          className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setRejectOpen(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            aria-label="Đóng"
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mb-4">Từ chối yêu cầu giảng viên</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lý do từ chối</label>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Nhập lý do..."
            className="w-full h-28 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          />
          {rejectError && (
            <p className="mt-2 text-sm text-red-600">{rejectError}</p>
          )}
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={() => setRejectOpen(false)}
              className="px-3 py-1 text-xs rounded-md border hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={submitReject}
              disabled={!rejectReason.trim() || rejectLoading === rejectId}
              className="px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
            >
              {rejectLoading === rejectId ? "Đang từ chối..." : "Xác nhận từ chối"}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}