"use client";
import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Function to detect links and format them as anchor tags
  const autoLinkify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" class="text-blue-500 underline">${url}</a>`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const formattedContent = autoLinkify(content); // Convert URLs into anchor tags
    onSubmit({ title, content: formattedContent });

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block mb-2 text-zinc-300">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={"ask a question..."}
        className="w-full px-4 py-2 border-[1px] text-zinc-200 bg-[var(--primary-dark)] rounded-lg"
      />
      
      <label className="block mt-3 mb-2 text-zinc-300">Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={"Body"}
        className="w-full p-2 rounded-lg border-[1px] text-zinc-200 bg-[var(--primary-dark)]"
        rows={4}
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