"use client";
import { useState } from "react";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import DOMPurify from "dompurify";
import Link from "next/link";
import ReplyForm from "./ReplyForm";
import { Avatar } from "@material-tailwind/react";
import { DragCloseDrawerExample } from "./Drawer";
import { generateAvatar } from "./ui/AvatarIcon";
import { getTimeAgo } from "../utils/getTimeAgo";

export default function Post({ post, addReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const sanitizedContent = DOMPurify.sanitize(post?.content);
  const avatar = generateAvatar(encodeURIComponent(post?.posted_by?.name))

  return (
    <div className="post-list relative border-b-[1px] border-zinc-600 py-1">
      <div className="p-4 shadow-md hover:bg-zinc-500/30 rounded-lg">
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
          className="text-sm font-extralight text-zinc-300 min-h-10"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Render post content with auto-linking
        />

        {/* BUTTONS */}
        <div className="flex items-center mt-3">
          <Link href={`/forum/${post.id}`}>
            <button className="text-zinc-200 text-sm border border-zinc-500 hover:bg-[var(--primary-dark)] px-3 py-1 rounded-full mr-2">
              Post reply
            </button>
          </Link>

          <div className="flex items-center border border-zinc-500 hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full mr-2">
            <HandThumbUpIcon className="w-4 mr-2" />
            <span>{post?.comments?.length}</span>
          </div>

          <div className="flex items-center border border-zinc-500 hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full">
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
