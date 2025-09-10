export const runtime = "edge";

// This is a Server Component
import BlogPostClientView from "@/components/BlogPostClientView";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

// Retain generateStaticParams for SSG
// export async function generateStaticParams() {
//   // Assuming getAllPostSlugs is adapted to return the correct format if needed,
//   // e.g., [{ slug: 'post-1'}, { slug: 'post-2' }]
//   const slugs = await getAllPostSlugs(); // Ensure this returns what generateStaticParams expects
//   return slugs.map((s) => ({ slug: s.params.slug })); // Original was: return getAllPostSlugs(); -> Adjust if its output changed
// }

// Define metadata generation function (optional, but good practice)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.description, // Assuming description is part of your BlogPost type
    // Add other metadata like openGraph images if available from post data
    openGraph: post.imageUrl
      ? {
          images: [{ url: post.imageUrl }],
        }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Pass the fetched post data to the Client Component
  return <BlogPostClientView post={post} />;
}
