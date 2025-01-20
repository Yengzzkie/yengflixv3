"use client"
import { use } from "react";

const PostPage = ({ params }) => {
  const postId = use(params).id;

  return <div>{postId}</div>;
};

export default PostPage;
