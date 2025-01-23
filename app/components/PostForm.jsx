"use client";
import { useState } from "react";
import { DragCloseDrawer } from "./ui/Drawer";
import QuillEditor from "./ui/Editor";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Stores Quill editor content
  const toolbar = [
    [{ size: ["small", false, "large", "huge"] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
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
    if (!title.trim() || !content.trim()) {
      return alert("Input fields cannot be empty");
    }

    onSubmit({ title, content });
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
        required
      />

      <div className="mt-4 text-white">
        <QuillEditor
          value={content}
          onChange={setContent}
          toolbar={toolbar}
          placeholder={"Type your content here..."}
        />
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
