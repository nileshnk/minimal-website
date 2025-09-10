// app/resume/viewer/page.tsx
import { Suspense } from "react";
import ResumeViewer from "./resume-viewer";

export const metadata = {
  title: "Resume | Nilesh Kumar",
  description: "Resume of Nilesh Kumar - Full Stack Developer",
};

export default function ViewerPage() {
  return (
    <Suspense fallback={<ViewerFallback />}>
      <ResumeViewer />
    </Suspense>
  );
}

function ViewerFallback() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-48 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
        </div>
        <p className="text-muted mt-4">Loading resume...</p>
      </div>
    </div>
  );
}
