"use client";
import { useState } from "react";
import QuillEditor from "./ui/Editor";

export default function ReplyForm({ onSubmit, value }) {
  const [content, setContent] = useState("");
  const toolbar = [
    [{ size: ["small", false, "large", "huge"] }],
    [{ font: [] }],
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video"],
    [{ list: "bullet" }],
    [{ align: [] }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    ["blockquote", "code-block"],
    ["clean"],
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 mt-8">
      <QuillEditor toolbar={toolbar} placeholder={"Post reply..."} value={value} />
      <button
        type="submit"
        className="mt-3 px-4 py-1 bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-white rounded-full"
      >
        Post
      </button>
    </form>
  );
}
