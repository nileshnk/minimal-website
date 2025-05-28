"use client";

import ArrowDownTray from "@iconify/icons-heroicons/arrow-down-tray-20-solid";
import DocumentText from "@iconify/icons-heroicons/document-text-20-solid";
import PrinterIcon from "@iconify/icons-heroicons/printer-20-solid";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function Resume() {
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch this from an API
        // const response = await fetch("/api/resume");
        // const data = await response.json();

        // For demo purposes, using a hardcoded Google Drive URL
        const data = {
          url: "https://drive.google.com/file/d/1HAY7AcnthPmdqiHGNPv1nuGZId3n_mIl/view",
        };

        const fileId = data.url.match(/\/d\/(.*?)\/view/)?.[1];
        const viewerUrl = `https://drive.google.com/file/d/${fileId}/preview?usp=sharing`;
        setResumeUrl(viewerUrl);
      } catch (error) {
        console.error("Error fetching resume URL:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeUrl();
  }, []);

  const handlePrint = () => {
    const printWindow = window.open(resumeUrl, "_blank");
    if (printWindow) {
      printWindow.addEventListener("load", () => {
        printWindow.print();
      });
    }
  };

  return (
    <div className="container-width min-h-screen pt-32 pb-20">
      <h1 className="heading-1 mb-8">Resume</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <p className="text-muted max-w-2xl mb-4 md:mb-0">
          Here's my latest resume with details about my work experience,
          education, and skills.
        </p>

        <div className="flex gap-4">
          <a
            href={`https://drive.google.com/uc?id=${
              resumeUrl.match(/\/d\/(.*?)\/preview/)?.[1]
            }&export=download`}
            download="nilesh_kumar_resume.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Icon icon={ArrowDownTray} width={20} height={20} />
            <span>Download</span>
          </a>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <Icon icon={PrinterIcon} width={20} height={20} />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Icon
              icon={DocumentText}
              width={48}
              height={48}
              className="text-gray-500 mb-4"
            />
            <p className="text-muted">Loading resume...</p>
          </div>
        ) : (
          <iframe
            src={resumeUrl}
            className="w-full h-[calc(100vh-300px)] min-h-[800px]"
            frameBorder="0"
            allowFullScreen
            title="Resume"
          />
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted mb-4">Want to learn more about my projects?</p>
        <a
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <span>View My Projects</span>
          <span className="text-sm">→</span>
        </a>
      </div>
    </div>
  );
}
