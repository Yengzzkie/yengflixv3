"use client";
import { useState } from "react";
import QuillEditor from "./Editor";
import DOMPurify from "dompurify";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Stores Quill editor content
  const previewTitle = title;
  const toolbar = [
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']                                         // remove formatting button
  ];
  console.log(content)

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

      <div>
        <h1 className="font-bold text-2xl mt-4">Post preview</h1>
        <div className="border min-h-[50vh] card-shadow ">
          <h1>{previewTitle}</h1>
          <div
            className="ql-editor text-zinc-300 post-list"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </form>
  );
}
