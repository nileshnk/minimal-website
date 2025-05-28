import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog | Nilesh Kumar",
  description:
    "Articles and thoughts by Nilesh Kumar on software engineering and web development.",
};

export default function BlogPage() {
  const blogPosts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container-width pt-16 pb-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <span className="text-sm">←</span>
            <span>Back to home</span>
          </Link>
        </div>
        <h1 className="heading-1 mb-4">Blog</h1>
        <p className="body-text max-w-2xl text-muted">
          My thoughts on software engineering, web development, and other
          topics.
        </p>
      </header>

      {/* Blog Posts */}
      <section className="container-width pb-32">
        <div className="space-y-16">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="mb-2">
                  <span className="text-sm text-muted">{post.date}</span>
                  {post.readTime && (
                    <span className="text-sm text-muted ml-3">
                      {post.readTime}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-normal mb-2 group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h2>
                <p className="text-muted">{post.description}</p>
              </Link>
            </article>
          ))}
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
