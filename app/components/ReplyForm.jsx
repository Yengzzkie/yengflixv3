"use client";
import { useState } from "react";

export default function ReplyForm({ onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 mt-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={"Post reply..."}
        className="w-full px-4 py-2 rounded-lg border border-zinc-500 text-zinc-200 bg-[var(--primary-dark)] outline-none"
        rows={2}
      />

<button
        type="submit"
        className="mt-3 px-4 py-1 bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-white rounded-full"
      >
        Post
      </button>
    </form>
  );
}