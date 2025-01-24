"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar } from "@material-tailwind/react";
import { HandThumbUpIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { SpringModal } from "@/app/components/ui/Modal";
import { getTimeAgo } from "@/app/utils/getTimeAgo";
import { generateAvatar } from "@/app/components/ui/AvatarIcon";
import { Spinner } from "@/app/components/Spinner";
import PostActionsBtn from "@/app/components/ui/PostActionsBtn";
import Replies from "@/app/components/Replies";
import ReplyForm from "@/app/components/ReplyForm";
import DOMPurify from "dompurify";
import axios from "axios";

const PostPage = ({ params }) => {
  const postId = use(params).id;
  const session = useSession();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const sanitizedContent = DOMPurify.sanitize(post?.content);
  const avatar = generateAvatar(encodeURIComponent(post?.posted_by?.name));

  async function getPost() {
    setLoading(true);
    try {
      const post = await axios.get(`/api/posts/post?postId=${postId}`);
      setPost(post.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  async function deletePost() {
    try {
      const post = await axios.delete(`/api/posts/post?postId=${postId}`);

      if (post.status === 200) {
        router.push("/forum");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="post-list p-4 max-w-5xl mx-auto border-zinc-500 rounded-lg my-4">
      <div className="flex items-center">
        <Avatar
          src={avatar}
          alt={`avatar ${post?.posted_by?.name}`}
          size="xs"
          className="mr-2"
        />
        <p className="text-sm italic">
          <span className="font-semibold text-zinc-200">
            / {post?.posted_by?.name}
          </span>
          <span className="text-zinc-400 text-xs">
            {" "}
            - {getTimeAgo(post?.createdAt)}
          </span>
        </p>

        {/* POST ACTION DROPDOWN BUTTONS */}
        {session?.data?.user?.id === post?.userId && ( // if the user Id from session and user Id from post is the same
          // then render the POST ACTION BUTTON
          <div className="ml-auto">
            <PostActionsBtn setIsOpen={setIsOpen} />
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        <SpringModal
          onDelete={deletePost}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={"Are you sure you want to delete this post?"}
        />
      </div>
      <h1 className="text-2xl font-bold my-4 text-white">{post?.title}</h1>
      <p
        className="ql-editor text-zinc-300 !min-h-fit"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* BUTTONS */}
      <div className="flex items-center mt-3">
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
        value={post?.content}
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
