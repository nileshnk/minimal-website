import config from "../../config.json";
import { Config } from "../types/resumes";

const typedConfig: Config = config as Config;

export const RESUME_VERSIONS = {
  DEFAULT: "0",
  NODEJS: "1",
  GOLANG: "2",
  JAVA: "3",
  PYTHON: "4",
  FULLSTACK: "5",
  MIXED: "6",
} as const;

export type ResumeVersion = keyof typeof RESUME_VERSIONS;

export class ResumeManager {
  private static getGoogleDriveFileId(url: string): string | null {
    const match = url.match(/\/d\/(.*?)\/view/);
    return match ? match[1] : null;
  }

  private static createGoogleDriveUrls(fileId: string) {
    return {
      viewerUrl: `https://drive.google.com/file/d/${fileId}/preview?usp=sharing`,
      downloadUrl: `https://drive.google.com/uc?id=${fileId}&export=download`,
    };
  }

  private static async checkLocalFile(version: string): Promise<boolean> {
    try {
      const response = await fetch(`/resume/${version}.pdf`, {
        method: "HEAD",
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private static createLocalFileUrls(version: string) {
    return {
      viewerUrl: `/resume/${version}.pdf`,
      downloadUrl: `/resume/${version}.pdf`,
    };
  }

  public static async getResumeUrls(version: string = "0"): Promise<{
    viewerUrl: string;
    downloadUrl: string;
    resumeType: string;
    source: "gdrive" | "local" | "fallback";
  }> {
    const resumeConfig = typedConfig.resumes[version];
    const resumeType = resumeConfig?.type || "default";

    // Priority 1: Check config.json URL
    if (resumeConfig?.url) {
      const fileId = this.getGoogleDriveFileId(resumeConfig.url);
      if (fileId) {
        const urls = this.createGoogleDriveUrls(fileId);
        return {
          ...urls,
          resumeType,
          source: "gdrive",
        };
      }
    }

    // Priority 2: Check local file
    const hasLocalFile = await this.checkLocalFile(version);
    if (hasLocalFile) {
      const urls = this.createLocalFileUrls(version);
      return {
        ...urls,
        resumeType,
        source: "local",
      };
    }

    // Priority 3: Fallback to default (version 0)
    if (version !== "0") {
      console.warn(
        `Resume version ${version} not found, falling back to default`
      );
      return this.getResumeUrls("0");
    }

    // Final fallback: Use legacy gDriveResumeUrl
    const fallbackFileId = this.getGoogleDriveFileId(
      typedConfig.gDriveResumeUrl
    );
    if (fallbackFileId) {
      const urls = this.createGoogleDriveUrls(fallbackFileId);
      return {
        ...urls,
        resumeType: "default",
        source: "fallback",
      };
    }

    throw new Error("No resume found");
  }

  public static getResumeDisplayName(version: string): string {
    const resumeConfig = typedConfig.resumes[version];
    return resumeConfig?.type || "Default";
  }

  public static getAllAvailableVersions(): Array<{
    version: string;
    type: string;
  }> {
    return Object.entries(typedConfig.resumes).map(([version, config]) => ({
      version,
      type: config.type,
    }));
  }
}
