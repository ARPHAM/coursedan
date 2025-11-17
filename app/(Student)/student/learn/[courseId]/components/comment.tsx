"use client";

import { useParams } from "next/navigation";
import { useCourse, useLecture } from "../_api/queries";
import { useQueryState } from "nuqs";
import { useComment, useReplyComment } from "../_api/mutations";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";

export default function Comment() {
  const newComment = useComment();
  const newReply = useReplyComment();
  const courseId = useParams().courseId[0];
  const [lectureId] = useQueryState("Lecture");
  const lecture = useLecture({ courseId, lectureId });
  const [replyInput, setReplyInput] = useState(0);
  const [contentComment, setContentComment] = useState("");
  const [contentReply, setContentReply] = useState("");
  const hanleReply = (commentId) => {
    setReplyInput(commentId);
  };
  if (!lecture.data) return null;
  return (
    <>
      <div className="flex mt-2">
        <input
          type="text"
          className="w-full h-10 bg-gray-200 p-3"
          placeholder="Viết bình luận ..."
          value={contentComment}
          onChange={(e) => setContentComment(e.target.value)}
        />
        <div
          onClick={async () => {
            await newComment.mutate({
              lectureId,
              data: { content: contentComment },
            });
            setContentComment("");
          }}
          className="flex bg-gray-200 justify-center w-10"
        >
          <SendOutlined />
        </div>
      </div>
      <div className="space-y-4 mt-2">
        {lecture.data.comment.map((comment) => (
          <div key={comment.atTime} className="border p-3 rounded">
            <div className="flex gap-4">
              <div className="flex rounded-full w-10 h-10 bg-amber-400">
                <div className="m-auto">{comment.author[0]}</div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="my-auto font-bold">{comment.author}</div>
                <h1 className="font-bold flex flex-wrap">{comment.content}</h1>
              </div>
            </div>
            <div
              className="text-gray-500 text-[10px] ml-15"
              onClick={() => hanleReply(comment.commentId)}
            >
              reply
            </div>
            {replyInput === comment.commentId && (
              <div className="flex mt-2 ml-12 justify-between">
                <input
                  type="text"
                  className="w-full h-10 bg-gray-200 p-3"
                  placeholder="Trả lời bình luận ..."
                  value={contentReply}
                  onChange={(e) => setContentReply(e.target.value)}
                />
                <div
                  onClick={async () => {
                    await newReply.mutate({
                      lectureId,
                      commentId: String(comment.commentId),
                      data: { content: contentReply },
                    });
                    setContentReply("");
                    setReplyInput(0);
                  }}
                  className="flex bg-gray-200 justify-center w-10"
                >
                  <SendOutlined />
                </div>
              </div>
            )}
            <div className="ml-4 mt-2 space-y-1">
              {comment.reply.map((reply) => (
                <div key={reply.atTime} className="text-sm text-gray-700">
                  <div className="flex gap-4">
                    <div className="flex rounded-full w-10 h-10 bg-amber-400">
                      <div className="m-auto">{reply.author[0]}</div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="my-auto font-bold">{reply.author}</div>
                      <h1 className="font-bold flex flex-wrap">
                        {reply.content}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
