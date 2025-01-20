"use client";
import { useState } from "react";

export default function ReplyForm({ onSubmit, placeholder }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block mt-3 mb-2 text-zinc-300">Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 rounded-md border-[1px] text-zinc-200 bg-[var(--primary-dark)]"
        rows={2}
      />

      <button
        type="submit"
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}