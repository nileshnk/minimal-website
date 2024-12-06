"use client"; // Need this for useState and useEffect

import { useState, useEffect } from "react";
import projectData from "../../../project-data.json";
export default function Projects() {
  const [projects, setProjects] = useState<
    Array<{ title: string; description: string; url?: string; github?: string }>
  >([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    // Replace this with your actual API call
    const fetchProjects = async () => {
      try {
        // const response = await fetch("/api/projects"); // Adjust the endpoint as needed
        // const data = await response.json();

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleTitleClick = (index: number, event: React.MouseEvent) => {
    // Only trigger if clicking the title area
    if ((event.target as HTMLElement).closest(".title-area")) {
      setExpandedId(expandedId === index ? null : index);
    }
  };

  return (
    <div
      className="w-2/6 h-screen flex items-center transition-colors"
      style={{ marginTop: "-5%", marginLeft: "25%" }}
    >
      <div className="flex flex-col h-[400px]">
        <h1 className="text-neutral-900 dark:text-[#f0f0f0] font-[480] text-[18px] leading-[24px] pb-[24px] transition-colors sticky top-0 bg-white dark:bg-black">
          Projects
        </h1>

        <ul className="space-y-2 w-full overflow-y-auto">
          {projects.map((project, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-md flex flex-col gap-y-3"
              onClick={(e) => handleTitleClick(index, e)}
            >
              <h2 className="title-area cursor-pointer text-neutral-900 dark:text-[#f0f0f0] font-medium text-[16px] leading-[24px]">
                {project.title}
              </h2>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-y-2N ${
                  expandedId === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p
                  className="font-[380] leading-[25px] dark:text-[#adadad] select-text text-sm"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />

                {project?.url && (
                  <a
                    href={project.url}
                    className="text-blue-500 text-sm group flex items-center gap-x-1"
                  >
                    Link
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="group-hover:translate-x-1 transition-transform duration-300 w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </a>
                )}
                {project?.github && (
                  <a
                    href={project.github}
                    className="text-blue-500 text-sm group flex items-center gap-x-1"
                  >
                    Github
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="group-hover:translate-x-1 transition-transform duration-300 w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
