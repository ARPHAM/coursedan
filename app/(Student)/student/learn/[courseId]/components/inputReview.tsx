"use client";
import { SendOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useState } from "react";
import { useReview } from "../_api/mutations";
import { useParams } from "next/navigation";
export default function InputReview() {
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(5);
  const courseId = useParams().courseId[0];
  const newReview = useReview();
  const handleSubmit = async () => {
    await newReview.mutate({ courseId, data: { rating: star, comment } });
    setStar(5);
    setComment("");
  };
  return (
    <div className="flex">
      <Rate value={star} onChange={(e) => setStar(e)} />
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-gray-200"
      />
      <div onClick={() => handleSubmit()}>
        <SendOutlined />
      </div>
    </div>
  );
}
