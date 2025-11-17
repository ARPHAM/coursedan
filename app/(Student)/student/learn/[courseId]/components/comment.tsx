"use client";

import { useCourse, useLecture } from "../_api/queries";
import { useQueryState } from "nuqs";
import { useComment, useReplyComment } from "../_api/mutations";
import { useState } from "react";
import { Send } from "lucide-react"; 
import { useParams } from "next/navigation"; // ✨ ĐÃ THÊM: Import useParams

export default function Comment() {
  const newComment = useComment();
  const newReply = useReplyComment();
  
  // ⚠️ LƯU Ý: Đảm bảo useParams trả về mảng nếu bạn truy cập [0]
  const courseId = String(useParams().courseId[0]); 
  
  const [lectureId] = useQueryState("Lecture");
  const lecture = useLecture({ courseId, lectureId });
  const [replyInput, setReplyInput] = useState(0);
  const [contentComment, setContentComment] = useState("");
  const [contentReply, setContentReply] = useState("");

  // Helper để lấy ngày giờ đẹp hơn
  const formatTime = (time: string) => {
      // Logic xử lý thời gian (ví dụ: new Date(time).toLocaleDateString())
      return time ? `${new Date(time).toLocaleTimeString()} ${new Date(time).toLocaleDateString()}` : 'Vừa xong';
  };

  const hanleReply = (commentId: number) => {
    // Chuyển về 0 để đóng input nếu click lần nữa
    setReplyInput(replyInput === commentId ? 0 : commentId); 
    setContentReply(""); // Xóa nội dung cũ
  };
  
  const handlePostComment = async () => {
    if (!contentComment.trim()) return;
    await newComment.mutate({
      lectureId,
      data: { content: contentComment.trim() },
    });
    setContentComment("");
  };

  const handlePostReply = async (commentId: number) => {
    if (!contentReply.trim()) return;
    await newReply.mutate({
      lectureId,
      commentId: String(commentId),
      data: { content: contentReply.trim() },
    });
    setContentReply("");
    setReplyInput(0);
  };


  if (lecture.isLoading || !lecture.data) {
    return <div className="p-4 text-center text-gray-500">Đang tải bình luận...</div>;
  }
  
  // Dữ liệu giả lập để tránh lỗi nếu API trả về null hoặc undefined
  const comments = lecture.data.comment || [];


  return (
    <div className="py-6 px-4">
      {/* 1. INPUT BÌNH LUẬN CHÍNH */}
      <div className="flex mb-8 border border-gray-400 rounded-lg overflow-hidden shadow-sm">
        <input
          type="text"
          className="grow h-12 p-3 text-sm focus:outline-none focus:ring-0"
          placeholder="Viết bình luận ..."
          value={contentComment}
          onChange={(e) => setContentComment(e.target.value)}
        />
        <button
          onClick={handlePostComment}
          disabled={!contentComment.trim() || newComment.isPending}
          className="flex items-center justify-center w-12 bg-gray-100 text-blue-600 hover:bg-blue-100 disabled:opacity-50 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>

      {/* 2. DANH SÁCH BÌNH LUẬN */}
      <div className="space-y-6">
        {comments.length === 0 && (
            <div className="text-center text-gray-500 py-6">Chưa có bình luận nào. Hãy là người đầu tiên!</div>
        )}

        {comments.map((comment, index) => (
          <div key={comment.atTime || index} className="border-b border-gray-300 pb-4 last:border-b-0 last:pb-0">
            
            {/* BÌNH LUẬN CHA */}
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="flex rounded-full w-10 h-10 bg-amber-400 text-white shrink-0 items-center justify-center text-lg font-bold">
                {comment.author[0]}
              </div>
              
              {/* Nội dung và Metadata */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900">{comment.author}</span>
                  <span className="text-gray-500 text-xs">{formatTime(comment.atTime)}</span>
                </div>
                
                <p className="text-gray-800 leading-relaxed words">
                    {comment.content}
                </p>
                
                {/* Nút Trả lời */}
                <button
                  className="text-blue-600 text-xs font-semibold self-start hover:underline mt-1"
                  onClick={() => hanleReply(comment.commentId || index + 1)} // Dùng index làm ID giả nếu commentId thiếu
                >
                  Phản hồi
                </button>
              </div>
            </div>
            
            {/* INPUT TRẢ LỜI (Reply Input) */}
            {replyInput === (comment.commentId || index + 1) && (
              <div className="flex mt-3 ml-12 gap-2">
                <input
                  type="text"
                  className="grow h-10 p-3 text-sm bg-gray-300 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Viết phản hồi ..."
                  value={contentReply}
                  onChange={(e) => setContentReply(e.target.value)}
                />
                <button
                  onClick={() => handlePostReply(comment.commentId || index + 1)}
                  disabled={!contentReply.trim() || newReply.isPending}
                  className="flex items-center justify-center w-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            )}

            {/* DANH SÁCH TRẢ LỜI CON */}
            {comment.reply?.length > 0 && (
              <div className="ml-12 mt-3 space-y-3 border-l-2 border-gray-300 pl-4">
                {comment.reply.map((reply, replyIndex) => (
                  <div key={reply.atTime || replyIndex} className="flex gap-3 text-sm">
                    {/* Avatar Con */}
                    <div className="flex rounded-full w-8 h-8 bg-amber-200 text-gray-800 shrink-0 items-center justify-center text-sm font-bold">
                      {reply.author[0]}
                    </div>
                    {/* Nội dung Con */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-gray-900">{reply.author}</span>
                        <span className="text-gray-500 text-xs">{formatTime(reply.atTime)}</span>
                      </div>
                      <p className="text-gray-700 words">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}