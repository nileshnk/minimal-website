import { Suspense } from "react";
import ResumeClient from "./ResumeClient";

export default function Resume() {
  return (
    <Suspense fallback={<ResumeFallback />}>
      <ResumeClient />
    </Suspense>
  );
}

function ResumeFallback() {
  return (
    <div className="container-width min-h-screen pt-32 pb-20">
      <h1 className="heading-1 mb-8">Resume</h1>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-96 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-80"></div>
        </div>
      </div>
    </div>
  );
}
