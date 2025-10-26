// app/resume/viewer/ResumeViewer.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import config from "../../../../config.json";

// Define resume types
const RESUME_TYPES = {
  0: "default",
  1: "NodeJS",
  2: "Golang",
  3: "Java",
  4: "Python",
  5: "GenAI",
  6: "Platform",
  7: "Mixed",
} as const;

type ResumeVersion = keyof typeof RESUME_TYPES;

interface ResumeConfig {
  type: string;
  url?: string;
}

interface ConfigWithResumes {
  gDriveResumeUrl: string;
  resumes?: Record<ResumeVersion, ResumeConfig>;
}

export default function ResumeViewer() {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

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
      return `LOCAL_FILE:${version}`;
    }

    // Priority 3: Fallback to default (version 0)
    if (version !== 0) {
      if (typedConfig.resumes && typedConfig.resumes[0]?.url) {
        return typedConfig.resumes[0].url;
      }

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

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get version from query parameter
        const versionParam = searchParams?.get("ver");
        const version = (
          versionParam ? parseInt(versionParam, 10) : 0
        ) as ResumeVersion;
        const validVersion = version in RESUME_TYPES ? version : 0;

        // Get the resume URL
        const resumeUrlResult = await getResumeUrl(validVersion);

        if (!resumeUrlResult) {
          throw new Error("No resume URL available");
        }

        // Determine the PDF URL to use
        let viewUrl: string;

        if (resumeUrlResult.startsWith("LOCAL_FILE:")) {
          // For local files, serve directly
          const fileVersion = resumeUrlResult.split(":")[1];
          viewUrl = `/resumes/${fileVersion}.pdf`;
        } else {
          // For Google Drive URLs, use the API to fetch and serve
          const encodedUrl = encodeURIComponent(resumeUrlResult);
          viewUrl = `/api/resume/view?ver=${validVersion}&url=${encodedUrl}`;
        }

        setPdfUrl(viewUrl);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError(err instanceof Error ? err.message : "Failed to load resume");
      } finally {
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [searchParams]);

  // Handle print when page loads (if print parameter is present)
  useEffect(() => {
    if (!isLoading && pdfUrl && searchParams?.get("print") === "true") {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [isLoading, pdfUrl, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Error loading resume</p>
          <p className="text-muted text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <iframe
        src={pdfUrl}
        className="w-full h-screen"
        title="Resume - Nilesh Kumar"
        style={{ border: "none" }}
      />
    </div>
  );
}
