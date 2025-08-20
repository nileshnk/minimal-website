"use client";

import ArrowDownTray from "@iconify/icons-heroicons/arrow-down-tray-20-solid";
import DocumentText from "@iconify/icons-heroicons/document-text-20-solid";
import PrinterIcon from "@iconify/icons-heroicons/printer-20-solid";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import config from "../../../config.json";
import { useSearchParams } from "next/navigation";

// Define resume types and their mappings (hidden from UI)
const RESUME_TYPES = {
  0: "default",
  1: "NodeJS",
  2: "Golang",
  3: "Java",
  4: "Python",
  5: "GenAI",
  6: "Mixed",
} as const;

type ResumeVersion = keyof typeof RESUME_TYPES;

interface ResumeConfig {
  type: string;
  url?: string;
}

interface ConfigWithResumes {
  gDriveResumeUrl: string; // Legacy support
  resumes?: Record<ResumeVersion, ResumeConfig>;
}

export default function ResumeClient() {
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [resumeDownloadUrl, setResumeDownloadUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentResumeType, setCurrentResumeType] = useState<string>("default");
  const [currentVersion, setCurrentVersion] = useState<ResumeVersion>(0);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  console.log(resumeDownloadUrl);
  /**
   * Extract Google Drive file ID from various URL formats
   */
  const extractGoogleDriveFileId = (url: string): string | null => {
    const patterns = [
      /\/d\/(.*?)\/view/,
      /\/d\/(.*?)$/,
      /id=(.*?)(&|$)/,
      /\/file\/d\/(.*?)\//,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  /**
   * Convert Google Drive URL to preview and download URLs
   */
  const processGoogleDriveUrl = (url: string) => {
    const fileId = extractGoogleDriveFileId(url);
    if (!fileId) {
      throw new Error("Invalid Google Drive URL format");
    }

    return {
      viewerUrl: `https://drive.google.com/file/d/${fileId}/preview?usp=sharing`,
      downloadUrl: `https://drive.google.com/uc?id=${fileId}&export=download`,
    };
  };

  /**
   * Check if a local resume file exists
   */
  const checkLocalResumeFile = async (
    version: ResumeVersion
  ): Promise<boolean> => {
    try {
      const response = await fetch(`/resumes/${version}.pdf`, {
        method: "HEAD",
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  /**
   * Get resume URL with fallback logic
   */
  const getResumeUrl = async (
    version: ResumeVersion
  ): Promise<string | null> => {
    const typedConfig = config as ConfigWithResumes;

    // Priority 1: Check if URL exists in config for this version
    if (typedConfig.resumes && typedConfig.resumes[version]?.url) {
      return typedConfig.resumes[version].url;
    }

    // Priority 2: Check if local file exists
    const localFileExists = await checkLocalResumeFile(version);
    if (localFileExists) {
      // Return a marker that indicates we should use local file
      return `LOCAL_FILE:${version}`;
    }

    // Priority 3: Fallback to default (version 0)
    if (version !== 0) {
      // Check default in config
      if (typedConfig.resumes && typedConfig.resumes[0]?.url) {
        return typedConfig.resumes[0].url;
      }

      // Check default local file
      const defaultLocalExists = await checkLocalResumeFile(0);
      if (defaultLocalExists) {
        return "LOCAL_FILE:0";
      }
    }

    // Priority 4: Legacy fallback to gDriveResumeUrl
    if (typedConfig.gDriveResumeUrl) {
      return typedConfig.gDriveResumeUrl;
    }

    return null;
  };

  /**
   * Download file from server with proper filename
   */
  const downloadFromServer = async (version: ResumeVersion) => {
    try {
      // Get the resume URL for this version
      const resumeUrlResult = await getResumeUrl(version);

      // Build the API endpoint URL with version and optional Google Drive URL
      let downloadUrl = `/api/resume/download?ver=${version}`;

      // If it's a Google Drive URL, pass it to the API
      if (resumeUrlResult && !resumeUrlResult.startsWith("LOCAL_FILE:")) {
        const encodedUrl = encodeURIComponent(resumeUrlResult);
        downloadUrl += `&url=${encodedUrl}`;
      }

      // Fetch the file from our API
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error("Failed to download resume");
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "NileshKumar_Resume.pdf";

      // Append to body, click, and remove
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again.");
    }
  };

  /**
   * Load resume based on version
   */
  const loadResume = async (version: ResumeVersion) => {
    try {
      setIsLoading(true);
      setError(null);

      const resumeUrlResult = await getResumeUrl(version);

      if (!resumeUrlResult) {
        throw new Error("No resume URL available");
      }

      // Handle local file
      if (resumeUrlResult.startsWith("LOCAL_FILE:")) {
        const fileVersionStr = resumeUrlResult.split(":")[1];
        const fileVersion = parseInt(fileVersionStr, 10) as ResumeVersion;
        const localUrl = `/resumes/${fileVersionStr}.pdf`;
        setResumeUrl(localUrl);
        // Store local download URL (not used directly, but kept for reference)
        setResumeDownloadUrl(localUrl);
        setCurrentResumeType(RESUME_TYPES[fileVersion] || "default");
      } else {
        // Handle Google Drive URL
        try {
          const { viewerUrl, downloadUrl } =
            processGoogleDriveUrl(resumeUrlResult);
          setResumeUrl(viewerUrl);
          // Store Google Drive download URL (not used directly, but kept for reference)
          setResumeDownloadUrl(downloadUrl);
          setCurrentResumeType(RESUME_TYPES[version]);
        } catch (urlError) {
          console.error("Error processing Google Drive URL:", urlError);
          throw new Error("Invalid Google Drive URL format");
        }
      }

      setCurrentVersion(version);
    } catch (error) {
      console.error("Error loading resume:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load resume"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeResume = async () => {
      // Get version from query parameter, default to 0
      const versionParam = searchParams?.get("ver");
      const version = (
        versionParam ? parseInt(versionParam, 10) : 0
      ) as ResumeVersion;

      // Validate version
      const validVersion = version in RESUME_TYPES ? version : 0;

      // Load the resume
      await loadResume(validVersion);

      // Handle download if requested
      if (searchParams?.get("download") === "true") {
        // Use setTimeout to ensure everything is loaded
        setTimeout(() => {
          downloadFromServer(validVersion);
        }, 500);
      }
    };

    initializeResume();
  }, [searchParams]);

  const handleDirectDownload = async () => {
    await downloadFromServer(currentVersion);
  };

  const handlePrint = () => {
    if (resumeUrl.startsWith("/resumes/")) {
      // For local files, open in new window then print
      const printWindow = window.open(resumeUrl, "_blank");
      if (printWindow) {
        printWindow.addEventListener("load", () => {
          setTimeout(() => printWindow.print(), 500);
        });
      }
    } else {
      // For Google Drive files
      const printWindow = window.open(resumeUrl, "_blank");
      if (printWindow) {
        printWindow.addEventListener("load", () => {
          printWindow.print();
        });
      }
    }
  };

  // Only show version info in development or when explicitly requested
  const showVersionInfo =
    process.env.NODE_ENV === "development" ||
    searchParams?.get("debug") === "true";

  return (
    <div className="container-width min-h-screen pt-32 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="heading-1">Resume</h1>
        {/* Only show version badge in development or debug mode */}
        {showVersionInfo && currentResumeType !== "default" && (
          <span className="px-3 py-1 bg-gray-800 text-sm rounded-md text-gray-300">
            {currentResumeType} (v{currentVersion})
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <p className="text-muted max-w-2xl mb-4 md:mb-0">
          Here&apos;s my latest resume with details about my work experience,
          education, and skills.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDirectDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Icon icon={ArrowDownTray} width={20} height={20} />
            <span>Download</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <Icon icon={PrinterIcon} width={20} height={20} />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Debug: Resume Version Selector - Only shown in development or debug mode */}
      {showVersionInfo && (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-yellow-300 mr-2">
              Debug - Version Selector:
            </span>
            {Object.entries(RESUME_TYPES).map(([key, value]) => {
              const versionKey = parseInt(key) as ResumeVersion;
              const isActive = versionKey === currentVersion;
              return (
                <a
                  key={key}
                  href={`?ver=${key}`}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-yellow-600 text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {value}
                </a>
              );
            })}
            <span className="text-xs text-yellow-400 ml-4">
              (Add ?debug=true to URL to show this in production)
            </span>
          </div>
        </div>
      )}

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
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Icon
              icon={DocumentText}
              width={48}
              height={48}
              className="text-red-500 mb-4"
            />
            <p className="text-red-400 mb-2">Error loading resume</p>
            <p className="text-sm text-muted">{error}</p>
            {showVersionInfo && (
              <p className="text-xs text-yellow-400 mt-2">
                Current version: {currentVersion} ({currentResumeType})
              </p>
            )}
          </div>
        ) : resumeUrl.startsWith("/resumes/") ? (
          // Local PDF file
          <embed
            src={resumeUrl}
            type="application/pdf"
            className="w-full h-[calc(100vh-300px)] min-h-[800px]"
            title="Resume"
          />
        ) : (
          // Google Drive iframe
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
