"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import Editor from "../components/Editor";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const session = useSession();
  const userId = session?.data?.user?.id;

  async function fetchPosts() {
    const response = await axios.get("/api/posts");
    const sortedPost = response?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort posts from newest to latest
    setPosts(sortedPost)
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  // Add new post
  const addPost = async ({ title, content }) => {
    const newPost = await axios.post("/api/posts", { userId, title, content })
    setPosts([newPost.data?.post, ...posts]);
    fetchPosts();
  };

  // Add a reply to a post
  const addReply = (postId, content) => {
    const updateReplies = (postsList) => {
      return postsList.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              { id: Date.now(), content, replies: [] },
            ],
          };
        } else if (post.replies.length > 0) {
          return { ...post, replies: updateReplies(post.replies) };
        }
        return post;
      });
    };

    setPosts(updateReplies(posts));
  };

  return (
    <div className="p-2 lg:p-8 w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome to <span className="text-[var(--secondary-dark)]">YENGFLIX</span><span className="text-[var(--dark-yellow)] font-extralight">v3</span> Community</h1>
      <PostForm onSubmit={addPost} />
      <div className="mt-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} addReply={addReply} />
        ))}
      </div>
    </div>
  );
}
