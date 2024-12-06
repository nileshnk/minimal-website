"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill";

export default function AddBlogPage() {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && quillRef.current) {
      import("quill").then((Quill) => {
        if (quillRef.current) {
          const q = new Quill.default(quillRef.current, {
            theme: isDarkMode ? "bubble" : "snow",
            modules: {
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["image", "code-block"],
              ],
            },
          });
          setQuill(q);
        }
      });
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const exportHTML = () => {
    if (quill) {
      const html = quill.root.innerHTML;
      console.log(html);
    }
  };

  return (
    <main className="w-4/6 mx-auto h-screen flex flex-col items-center">
      <h1 className="text-2xl font-semibold mt-4">Add New Blog</h1>
      <button onClick={toggleDarkMode} className="mt-2">
        Toggle Dark Mode
      </button>
      <div className="flex-1 overflow-y-auto mt-4 w-full">
        <div ref={quillRef} className="h-full"></div>
      </div>
      <button onClick={exportHTML} className="mt-2">
        Export HTML
      </button>
    </main>
  );
}
