interface BlogPostProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { id } = await params;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold">Post: {id}</h1>
      <p>Content coming soon...</p>
    </main>
  );
}
