"use client";
import { useState } from "react";
import { ChatBubbleBottomCenterIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@material-tailwind/react";
import { generateAvatar } from "./ui/AvatarIcon";
import { getTimeAgo } from "../utils/getTimeAgo";
import DOMPurify from "dompurify";
import Link from "next/link";
import ReplyForm from "./ReplyForm";
import 'quill/dist/quill.snow.css';

export default function Post({ post, addReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const sanitizedContent = DOMPurify.sanitize(post?.content);
  const avatar = generateAvatar(encodeURIComponent(post?.posted_by?.name));

  return (
    <Link href={`/forum/${post.id}`}>
      <div className="post-list relative border-b-[1px] border-zinc-600 py-2 min-h-fit">
        <div className="p-4 shadow-md hover:bg-zinc-500/10 rounded-lg">
          <div className="flex items-center">
            <Avatar
              src={avatar}
              alt={`avatar ${post?.posted_by?.name}`}
              size="xs"
              className="mr-2 "
            />
            <p className="text-zinc-500 italic text-xs">
              <span className="font-semibold text-[var(--primary-content)]">
                / {post?.posted_by?.name}
              </span>{" "}
              - <span>{getTimeAgo(post?.createdAt)}</span>
            </p>
          </div>
          <h1 className="text-lg font-semibold text-zinc-200 my-2">
            {post?.title}
          </h1>
          <div
            className="ql-editor scrollbar-none text-sm font-extralight text-zinc-300 max-h-fit"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* BUTTONS */}
          <div className="flex items-center mt-3">
            <button className="text-zinc-200 text-sm border border-zinc-500 hover:bg-[var(--primary-dark)] px-3 py-1 rounded-full mr-2">
              Post reply
            </button>

            <div className="flex items-center border border-zinc-500 hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full mr-2">
              <HandThumbUpIcon className="w-4 mr-2" />
              <span>{post?.comments?.length}</span>
            </div>

            <div className="flex items-center border border-zinc-500 hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full">
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
      </div>
    </Link>
  );
}
