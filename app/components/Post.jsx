"use client";
import { useState } from "react";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import DOMPurify from "dompurify";
import Link from "next/link";
import ReplyForm from "./ReplyForm";
import { DragCloseDrawerExample } from "./Drawer";

export default function Post({ post, addReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const sanitizedContent = DOMPurify.sanitize(post?.content);

  return (
    <div className="relative border-b-[1px] border-zinc-600 py-1">
      <div className="p-4 shadow-md hover:bg-zinc-500/30 rounded-lg">
        <p className="text-zinc-500 italic text-xs">
          Posted by: {post?.posted_by?.name} -{" "}
          <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        </p>
        <h1 className="text-lg font-semibold text-zinc-200 my-2">
          {post?.title}
        </h1>
        <div
          className="text-sm font-extralight text-zinc-400"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Render post content with auto-linking
        />

        {/* BUTTONS */}
        <div className="flex items-center mt-3">
          <Link href={`/forum/${post.id}`}>
            <button className="text-zinc-200 text-sm bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] px-3 py-1 rounded-full mr-2">
              Post reply
            </button>
          </Link>

          <div className="flex items-center bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full mr-2">
            <HandThumbUpIcon className="w-4 mr-2" />
            <span>{post?.comments?.length}</span>
          </div>

          <div className="flex items-center bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full">
            <ChatBubbleBottomCenterIcon className="w-4 mr-2" />
            <span>{post?.comments?.length}</span>
          </div>

          <DragCloseDrawerExample post={post} />
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
    </div>
  );
}
