export interface ResumeConfig {
  type: string;
  url: string;
}

export interface Config {
  gDriveResumeUrl: string;
  resumes: Record<string, ResumeConfig>;
}
