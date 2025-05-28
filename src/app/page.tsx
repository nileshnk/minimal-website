import { getAllPosts } from "@/lib/blog";
import githubIcon from "@iconify-icons/simple-icons/github";
import linkedinIcon from "@iconify-icons/simple-icons/linkedin";
import twitterIcon from "@iconify-icons/simple-icons/twitter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function HomePage() {
  const blogPosts = getAllPosts().slice(0, 3); // Show only the 3 most recent posts

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-width section-spacing pt-32">
        <h1 className="heading-1 mb-2">Nilesh Kumar</h1>
        <p className="text-xl text-muted mb-8">Software Engineer</p>
        <p className="body-text max-w-2xl">
          I'm a software engineer with a passion for building scalable and
          efficient systems. I'm currently working at{" "}
          <a
            href="https://www.reddit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4"
          >
            Reddit
          </a>
          .
        </p>
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
