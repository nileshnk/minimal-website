export const runtime = "edge";

// app/api/resume/view/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

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
 * Get cache directory path
 */
function getCacheDir(): string {
  return path.join(process.cwd(), ".cache", "resumes");
}

/**
 * Get cached file path for a Google Drive URL
 */
function getCachedFilePath(url: string): string {
  const hash = crypto.createHash("md5").update(url).digest("hex");
  return path.join(getCacheDir(), `${hash}.pdf`);
}

/**
 * Ensure cache directory exists
 */
async function ensureCacheDir(): Promise<void> {
  const cacheDir = getCacheDir();
  try {
    await fs.mkdir(cacheDir, { recursive: true });
  } catch (error) {
    console.error("Error creating cache directory:", error);
  }
}

/**
 * Check if cached file exists and is valid
 */
async function getCachedFile(url: string): Promise<Buffer | null> {
  const cachedPath = getCachedFilePath(url);

  try {
    const stats = await fs.stat(cachedPath);

    // Check if cache is less than 7 days old
    const cacheAge = Date.now() - stats.mtime.getTime();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    if (cacheAge > maxAge) {
      console.log("Cache expired for view:", url);
      return null;
    }

    console.log("Serving view from cache:", cachedPath);
    return await fs.readFile(cachedPath);
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Save file to cache
 */
async function saveToCache(url: string, buffer: Buffer): Promise<void> {
  await ensureCacheDir();
  const cachedPath = getCachedFilePath(url);

  try {
    await fs.writeFile(cachedPath, buffer);
    console.log("Saved to cache for view:", cachedPath);
  } catch (error) {
    console.error("Error saving to cache:", error);
  }
}

/**
 * Download file from Google Drive with caching
 */
async function downloadFromGoogleDrive(url: string): Promise<Buffer> {
  // Check cache first
  const cachedBuffer = await getCachedFile(url);
  if (cachedBuffer) {
    return cachedBuffer;
  }

  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    throw new Error("Invalid Google Drive URL format");
  }

  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    console.log("Downloading from Google Drive for view:", fileId);
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
      const buffer = Buffer.from(arrayBuffer);

      // Save to cache
      await saveToCache(url, buffer);

      return buffer;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to cache
    await saveToCache(url, buffer);

    return buffer;
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
    console.log(error);
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

    // Priority 1: If Google Drive URL is provided, download from there (with caching)
    if (urlParam) {
      try {
        const decodedUrl = decodeURIComponent(urlParam);
        fileBuffer = await downloadFromGoogleDrive(decodedUrl);
      } catch (gdError) {
        console.error(
          "Google Drive download failed for view, trying local fallback:",
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

    // Create response with inline viewing headers (not download)
    // const response = new NextResponse(fileBuffer, {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/pdf",
    //     "Content-Disposition": 'inline; filename="NileshKumar_Resume.pdf"', // inline instead of attachment
    //     "Content-Length": fileBuffer.length.toString(),
    //     "Cache-Control": "public, max-age=3600", // Cache for 1 hour on client
    //   },
    // });

    return new Response(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="NileshKumar_Resume.pdf"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour on client
      },
    });

    // return response;
  } catch (error) {
    console.error("Error serving resume for view:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
