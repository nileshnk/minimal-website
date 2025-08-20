// app/api/resume/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Define resume types
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

/**
 * Extract Google Drive file ID from various URL formats
 */
function extractGoogleDriveFileId(url: string): string | null {
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
}

/**
 * Download file from Google Drive
 */
async function downloadFromGoogleDrive(url: string): Promise<Buffer> {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    throw new Error("Invalid Google Drive URL format");
  }

  // Use Google Drive direct download URL
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    const response = await fetch(downloadUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      // Try alternative download URL
      const altUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
      const altResponse = await fetch(altUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!altResponse.ok) {
        throw new Error(
          `Failed to download from Google Drive: ${altResponse.status}`
        );
      }

      const arrayBuffer = await altResponse.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error downloading from Google Drive:", error);
    throw new Error("Failed to download file from Google Drive");
  }
}

/**
 * Load resume from local file system
 */
async function loadLocalResume(version: ResumeVersion): Promise<Buffer | null> {
  const resumePath = path.join(
    process.cwd(),
    "public",
    "resumes",
    `${version}.pdf`
  );

  try {
    const fileBuffer = await fs.readFile(resumePath);
    return fileBuffer;
  } catch (error) {
    console.error(`Error loading local resume for version ${version}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get parameters from query
    const searchParams = request.nextUrl.searchParams;
    const versionParam = searchParams.get("ver");
    const urlParam = searchParams.get("url");

    const version = (
      versionParam ? parseInt(versionParam, 10) : 0
    ) as ResumeVersion;
    const validVersion = version in RESUME_TYPES ? version : 0;

    let fileBuffer: Buffer;

    // Priority 1: If Google Drive URL is provided, download from there
    if (urlParam) {
      try {
        console.log("Attempting to download from Google Drive:", urlParam);
        fileBuffer = await downloadFromGoogleDrive(
          decodeURIComponent(urlParam)
        );
      } catch (gdError) {
        console.error(
          "Google Drive download failed, trying local fallback:",
          gdError
        );

        // Fallback to local file if Google Drive fails
        const localBuffer = await loadLocalResume(validVersion);
        if (localBuffer) {
          fileBuffer = localBuffer;
        } else if (validVersion !== 0) {
          // Try default version as last resort
          const defaultBuffer = await loadLocalResume(0);
          if (defaultBuffer) {
            fileBuffer = defaultBuffer;
          } else {
            return NextResponse.json(
              {
                error:
                  "Resume file not found (Google Drive failed, no local fallback)",
              },
              { status: 404 }
            );
          }
        } else {
          return NextResponse.json(
            { error: "Resume file not found" },
            { status: 404 }
          );
        }
      }
    } else {
      // Priority 2: Try to load from local file system
      const localBuffer = await loadLocalResume(validVersion);

      if (localBuffer) {
        fileBuffer = localBuffer;
      } else if (validVersion !== 0) {
        // Priority 3: Fallback to default version (0)
        const defaultBuffer = await loadLocalResume(0);
        if (defaultBuffer) {
          fileBuffer = defaultBuffer;
        } else {
          return NextResponse.json(
            { error: "Resume file not found" },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "Resume file not found" },
          { status: 404 }
        );
      }
    }

    // Use the native Response object for binary data to avoid issues with NextResponse
    // Convert Buffer to Uint8Array for Response
    return new Response(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="NileshKumar_Resume.pdf"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "no-cache", // Don't cache as content might change
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Add HEAD method for checking file existence
export async function HEAD(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const versionParam = searchParams.get("ver");
    const urlParam = searchParams.get("url");
    const version = (
      versionParam ? parseInt(versionParam, 10) : 0
    ) as ResumeVersion;
    const validVersion = version in RESUME_TYPES ? version : 0;

    // If URL is provided, assume it exists (we can't easily check Google Drive)
    if (urlParam) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
        },
      });
    }

    // Check local file
    const resumePath = path.join(
      process.cwd(),
      "public",
      "resumes",
      `${validVersion}.pdf`
    );
    await fs.access(resumePath);

    return new NextResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Error checking resume file existence:", error);
    // If file doesn't exist, return 404
    return new NextResponse(null, { status: 404 });
  }
}
