import { getAllPosts } from "@/lib/blog";
import githubIcon from "@iconify-icons/simple-icons/github";
import linkedinIcon from "@iconify-icons/simple-icons/linkedin";
import twitterIcon from "@iconify-icons/simple-icons/twitter";
import { Icon } from "@iconify/react";
import Link from "next/link";
import experienceData from "../../experience-data.json";
import projectData from "../../project-data.json";

// Define the Project type to match the structure in project-data.json
type Project = {
  title: string;
  description: string;
  github?: string;
  url?: string;
};

// Define the Experience type
type Experience = {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
};

export default function HomePage() {
  const blogPosts = getAllPosts().slice(0, 3); // Show only the 3 most recent posts
  const featuredProjects: Project[] = projectData.slice(0, 3); // Show only the 3 most recent projects
  const featuredExperience: Experience[] = experienceData.slice(0, 2); // Show only the 2 most recent experiences

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-width section-spacing pt-32">
        <h1 className="heading-1 mb-2">Nilesh Kumar</h1>
        <div className="flex items-center gap-2 text-xl text-muted mb-8">
          <p>Software Engineer</p>
          <span>|</span>
          <Link
            href="/resume"
            className="text-white hover:opacity-70 transition-opacity"
          >
            Resume
          </Link>
        </div>
        <p className="body-text max-w-2xl">
          Hey there! I&apos;m a backend engineer obsessed with building systems
          that just work—fast, reliable, and built to scale. Whether it&apos;s
          fintech apps moving millions or healthcare systems that demand
          security, I craft language agnostic solutions with performance,
          automation, and maintainability in mind.
        </p>
      </section>

      {/* Experience Section */}
      <section className="container-width section-spacing">
        <h2 className="heading-2 mb-8">Experience</h2>
        <div className="space-y-8">
          {featuredExperience.map((job, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <h3 className="text-xl font-normal">{job.company}</h3>
                <span className="text-muted text-sm">{job.duration}</span>
              </div>
              <p className="text-muted mb-2">{job.position}</p>
              <p className="text-muted mb-4">{job.description}</p>
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
      </section>

      {/* Blog Section */}
      <section className="container-width section-spacing">
        <div className="flex justify-between items-center mb-12">
          <h2 className="heading-2">Blog</h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <span>View all posts</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-xl md:text-2xl font-normal mb-2 group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-muted">{post.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="container-width section-spacing">
        <div className="flex justify-between items-center mb-12">
          <h2 className="heading-2">Projects</h2>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <span>View all projects</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
        <div className="space-y-12">
          {featuredProjects.map((project, index) => (
            <article key={index} className="group">
              <div className="block">
                <h3 className="text-xl md:text-2xl font-normal mb-2 group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-muted mb-4">{project.description}</p>
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted hover:text-white transition-colors"
                    >
                      <Icon icon={githubIcon} width={16} height={16} />
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
                      <span>Visit Project</span>
                      <span className="text-sm">→</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section className="container-width section-spacing pb-32">
        <h2 className="heading-2 mb-8">Connect</h2>
        <p className="body-text mb-8">
          Feel free to contact me at{" "}
          <a
            href="mailto:hello@nileshkumar.dev"
            className="text-white underline underline-offset-4"
          >
            hello@nileshkumar.dev
          </a>
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/nileshnk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <Icon icon={githubIcon} width={20} height={20} />
            <span>Github</span>
          </a>
          <a
            href="https://x.com/whynilesh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <Icon icon={twitterIcon} width={20} height={20} />
            <span>Twitter</span>
          </a>
          <a
            href="https://linkedin.com/in/inilesh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <Icon icon={linkedinIcon} width={20} height={20} />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-width pb-8 text-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Nilesh.
        </p>
      </footer>
    </div>
  );
}
