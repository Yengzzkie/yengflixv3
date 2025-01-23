"use client";
import { useState } from "react";
import QuillEditor from "./Editor";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Stores Quill editor content
  const toolbar = [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }], // Enables bullet points
    ["link"],
    [{ color: [] }],
  ];

  // Function to detect links and format them as anchor tags
  // const autoLinkify = (text) => {
  //   const urlRegex = /(https?:\/\/[^\s]+)/g;
  //   return text.replace(
  //     urlRegex,
  //     (url) => `<a href="${url}" target="_blank" class="text-blue-500 underline">${url}</a>`
  //   );
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {

      return alert("Input fields cannot be empty")
    };

    // const formattedContent = autoLinkify(content); // Convert URLs into anchor tags
    onSubmit({ title, content: content });

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={"Your title here..."}
        className="w-full px-4 py-2 border-[1px] text-zinc-100 bg-transparent rounded-lg"
      />

      <div className="mt-4 text-white">
        <QuillEditor value={content} onChange={setContent} toolbar={toolbar} placeholder={"Type your content here..."} />
      </div>

      <button
        type="submit"
        className="mt-3 px-4 py-1 bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-white rounded-full"
      >
        Post
      </button>
    </form>
  );
}
