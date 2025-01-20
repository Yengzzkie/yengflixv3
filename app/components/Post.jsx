"use client";
import { useState } from "react";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import ReplyForm from "./ReplyForm";

export default function Post({ post, addReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="relative border-b-[1px] py-2">
      <Link href={`/forum/${post.id}`}>
        <div className="p-4 shadow-md hover:bg-zinc-500/30 rounded-lg">
          <p className="text-zinc-500 italic text-xs">
            Posted by: {post?.posted_by?.name} -{" "}
            <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
          </p>
          <h1 className="text-lg font-semibold text-zinc-200 my-2">{post?.title}</h1>
          <p className="text-sm font-extralight text-zinc-400">{post?.content}</p>

          {/* BUTTONS */}
          <div className="flex items-center mt-3">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-zinc-200 text-sm bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] px-3 py-1 rounded-full mr-2"
            >
              Reply
            </button>

            <div className="flex items-center bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full mr-2">
              <HandThumbUpIcon className="w-4 mr-2" />
              <span>{post?.comments?.length}</span>
            </div>

            <div className="flex items-center bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full">
              <ChatBubbleBottomCenterIcon className="w-4 mr-2" />
              <span>{post?.comments?.length}</span>
            </div>
          </div>
          {showReplyForm && (
            <ReplyForm
              placeholder={"reply..."}
              onSubmit={(content) => {
                addReply(post.id, content);
                setShowReplyForm(false);
              }}
            />
          )}
        </div>
        {/* Render Replies */}
        {/* <div className="ml-6 border-l-2 border-gray-300 pl-4">
          {post?.comments?.map((post) => (
            <Post key={post.id} post={post} addReply={addReply} />
          ))}
        </div> */}
      </Link>
    </div>
  );
}
