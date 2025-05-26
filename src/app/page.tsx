import { getAllPosts } from "@/lib/blog";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const blogPosts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-width section-spacing pt-32">
        <h1 className="heading-1 mb-2">Nilesh Kumar</h1>
        <p className="text-xl text-muted mb-8">Web Developer</p>
        <p className="body-text max-w-2xl">
          Dedicated to building responsive and user-friendly digital interfaces.
          Connecting creative design with efficient technical implementation.
        </p>
      </section>

      {/* Blog Section */}
      <section className="container-width section-spacing">
        <h2 className="heading-2 mb-12">Blog</h2>
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

      {/* Connect Section */}
      <section className="container-width section-spacing pb-32">
        <h2 className="heading-2 mb-8">Connect</h2>
        <p className="body-text mb-8">
          Feel free to contact me at{" "}
          <a
            href="mailto:your.email@gmail.com"
            className="text-white underline underline-offset-4"
          >
            your.email@gmail.com
          </a>
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <Github size={20} />
            <span>Github</span>
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <Twitter size={20} />
            <span>Twitter</span>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <Linkedin size={20} />
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
