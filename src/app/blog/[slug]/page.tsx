import CopyUrlButton from "@/components/CopyUrlButton";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container-width pt-8 pb-16">
        <div className="flex items-center justify-between mb-16">
          <Link
            href="/"
            className="text-muted hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Nilesh Kumar</span>
            </div>
          </Link>
          <CopyUrlButton />
        </div>
        <p className="text-muted mb-4">Web Developer</p>
      </header>

      {/* Hero Image */}
      {post.imageUrl && (
        <div className="container-width mb-16">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title || "Blog post image"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          {post.imageCaption && (
            <p className="text-sm text-muted mt-2 text-center">
              {post.imageCaption}
            </p>
          )}
        </div>
      )}

      {/* Article Content */}
      <article className="container-width pb-32">
        <h1 className="heading-1 mb-12">{post.title}</h1>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Footer */}
      <footer className="container-width pb-8 text-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Nilesh.
        </p>
      </footer>
    </div>
  );
}
