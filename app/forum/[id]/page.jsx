"use client";
import { use, useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import DOMPurify from "dompurify";
import Replies from "@/app/components/Replies"
import ReplyForm from "@/app/components/ReplyForm";
import axios from "axios";

const PostPage = ({ params }) => {
  const postId = use(params).id;
  const [post, setPost] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const sanitizedContent = DOMPurify.sanitize(post?.content);

  async function getPost() {
    const post = await axios.get(`/api/posts/post?postId=${postId}`);
    setPost(post.data);
    console.log(post);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto border border-zinc-500 rounded-lg my-4">
      <div className="flex items-center">
        <Avatar
          src={`https://ui-avatars.com/api/?name=${post?.posted_by?.name}&background=random`}
          alt={`avatar ${post?.posted_by?.name}`}
          size="xs"
          className="mr-2 rounded-full"
        />
        <p className="text-sm italic text-zinc-400">
          Posted by: {post?.posted_by?.name}
        </p>
      </div>
      <h1 className="text-2xl font-bold my-4">{post?.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      {/* BUTTONS */}
      <div className="flex items-center mt-3">
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-zinc-200 text-sm  border border-zinc-500 hover:bg-[var(--primary-dark)] px-3 py-1 rounded-full mr-2"
        >
          {showReplyForm ? "Close" : "Reply"}
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
