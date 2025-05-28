"use client"; // Need this for useState and useEffect

import githubIcon from "@iconify-icons/simple-icons/github";
import ArrowTopRightOnSquare from "@iconify/icons-heroicons/arrow-top-right-on-square-20-solid";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import experienceData from "../../../experience-data.json";
import projectData from "../../../project-data.json";
// Define Project type to match the structure in project-data.json
type Project = {
  title: string;
  description: string;
  github?: string;
  url?: string;
};

const workExperience = experienceData;

export default function ProjectsAndExperience() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"projects" | "experience">(
    "projects"
  );

  useEffect(() => {
    // Replace this with your actual API call
    const fetchProjects = async () => {
      try {
        // const response = await fetch("/api/projects"); // Adjust the endpoint as needed
        // const data = await response.json();

        setProjects(projectData as Project[]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container-width min-h-screen pt-32 pb-20">
      <h1 className="heading-1 mb-12">Work & Projects</h1>

      {/* Tabs */}
      <div className="flex space-x-6 mb-12 border-b border-gray-800">
        <button
          onClick={() => setActiveTab("projects")}
          className={`pb-4 relative ${
            activeTab === "projects"
              ? "text-white"
              : "text-muted hover:text-white"
          } transition-colors`}
        >
          Projects
          {activeTab === "projects" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("experience")}
          className={`pb-4 relative ${
            activeTab === "experience"
              ? "text-white"
              : "text-muted hover:text-white"
          } transition-colors`}
        >
          Work Experience
          {activeTab === "experience" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
          )}
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <h2 className="text-2xl font-normal mb-4">{project.title}</h2>
              <p className="text-muted max-w-3xl mb-6">{project.description}</p>
              <div className="flex gap-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted hover:text-white transition-colors"
                  >
                    <Icon icon={githubIcon} width={18} height={18} />
                    <span>View Code</span>
                  </a>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted hover:text-white transition-colors"
                  >
                    <Icon icon={ArrowTopRightOnSquare} width={18} height={18} />
                    <span>Visit Project</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === "experience" && (
        <div className="space-y-16">
          {workExperience.map((job, index) => (
            <div key={index} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                <h2 className="text-2xl font-normal">{job.company}</h2>
                <span className="text-muted text-sm">{job.duration}</span>
              </div>
              <h3 className="text-lg text-muted mb-4">{job.position}</h3>
              <p className="text-muted max-w-3xl mb-6">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 text-center">
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <span>View Full Resume</span>
          <span className="text-sm">→</span>
        </Link>
      </div>
    </div>
  );
}
