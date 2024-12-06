"use client";

import { useState, useEffect } from "react";

export default function Resume() {
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        // const response = await fetch("/api/resume");
        // const data = await response.json();
        const data = {
          url: "https://drive.google.com/file/d/1HAY7AcnthPmdqiHGNPv1nuGZId3n_mIl/view",
        };
        const fileId = data.url.match(/\/d\/(.*?)\/view/)?.[1];
        const viewerUrl = `https://drive.google.com/file/d/${fileId}/preview?usp=sharing`;
        setResumeUrl(viewerUrl);
      } catch (error) {
        console.error("Error fetching resume URL:", error);
      }
    };

    fetchResumeUrl();
  }, []);

  return (
    <div
      className="w-4/6 h-screen flex flex-col items-center transition-colors"
      style={{ marginTop: "-5%", marginLeft: "16.67%" }} // Adjusted for center alignment
    >
      <div className="flex flex-col h-full w-full">
        <h1 className="text-neutral-900 dark:text-[#f0f0f0] font-[480] text-[18px] leading-[24px] pb-[24px] transition-colors sticky top-0 bg-white dark:bg-black text-center pt-8 text-2xl font-semibold">
          Resume
        </h1>

        <div className="flex-1 mb-4 rounded-lg border border-gray-200 dark:border-gray-700">
          {resumeUrl && (
            <iframe
              src={resumeUrl}
              className="w-full h-[calc(100vh-100px)]" // Adjusted height to fill the screen minus header
              frameBorder="0"
              allowFullScreen
            />
          )}
        </div>

        <div className="flex justify-center mb-12 py-4">
          <a
            href={`https://drive.google.com/uc?id=${
              resumeUrl.match(/\/d\/(.*?)\/preview/)?.[1]
            }&export=download`}
            download="resume.pdf"
            className="flex items-center gap-x-2 px-6 py-2.5 text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:shadow-md"
          >
            Download Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
