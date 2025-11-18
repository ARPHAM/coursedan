"use client";

import { SendOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useState } from "react";
import { useReview } from "../_api/mutations";
import { useParams } from "next/navigation";

export default function InputReview() {
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(0);
  const courseId = useParams().courseId[0];
  const newReview = useReview();

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    await newReview.mutate({ courseId, data: { rating: star, comment } });
    setStar(5);
    setComment("");
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Rating */}
      <div>
        <Rate value={star} onChange={(value) => setStar(value)} />
      </div>

      {/* Input + Send */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Hãy viết cảm nhận của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          onClick={handleSubmit}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
        >
          <SendOutlined className="text-lg" />
        </button>
      </div>
    </div>
  );
}
