"use client";
import { use, useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import DOMPurify from "dompurify";
import Replies from "@/app/components/Replies";
import ReplyForm from "@/app/components/ReplyForm";
import { getTimeAgo } from "@/app/utils/getTimeAgo";
import { generateAvatar } from "@/app/components/ui/AvatarIcon";
import axios from "axios";

const PostPage = ({ params }) => {
  const postId = use(params).id;
  const [post, setPost] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const sanitizedContent = DOMPurify.sanitize(post?.content);
  const avatar = generateAvatar(encodeURIComponent(post?.posted_by?.name))

  async function getPost() {
    const post = await axios.get(`/api/posts/post?postId=${postId}`);
    setPost(post.data);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="post-list p-4 max-w-5xl mx-auto border-zinc-500 rounded-lg my-4">
      <div className="flex items-center">
        <Avatar
          src={avatar}
          alt={`avatar ${post?.posted_by?.name}`}
          size="xs"
          className="mr-2"
        />
        <p className="text-sm italic">
          <span className="font-semibold text-zinc-200">/ {post?.posted_by?.name}</span>
          <span className="text-zinc-400 text-xs"> - {getTimeAgo(post?.createdAt)}</span>
        </p>
      </div>
      <h1 className="text-2xl font-bold my-4 text-white">{post?.title}</h1>
      <p className="text-zinc-300" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      {/* BUTTONS */}
      <div className="flex items-center mt-3">
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-zinc-200 text-sm border border-zinc-500 hover:bg-[var(--primary-dark)] px-3 py-1 rounded-full mr-2"
        >
          {showReplyForm ? "Close" : "Reply"}
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

      {/* REPLY FORM */}

      <ReplyForm
        placeholder={"reply..."}
        onSubmit={(content) => {
          addReply(post.id, content);
          setShowReplyForm(false);
        }}
      />

      <div className="ml-6 border-l-[.5px] border-zinc-500 pl-4">
        {post?.comments?.map((post) => (
          <Replies key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
