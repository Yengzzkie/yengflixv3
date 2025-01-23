import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

const Editor = ({ value, onChange, toolbar, placeholder }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (quillInstance.current) return;

    if (!editorRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: placeholder,
      modules: {
        toolbar: toolbar,
      },
    });

    quillInstance.current = quill;

    if (value) {
      quill.setContents(quill.clipboard.convert(value));
    }

    quill.on("text-change", () => {
      if (onChange && quillInstance.current) {
        const htmlContent = quill.root.innerHTML;
        onChange(htmlContent);
      }
    });

    return () => {
      quill.off("text-change");
      quillInstance.current = null;
    };
  }, []);

  return <div ref={editorRef} />;
};

export default Editor;
