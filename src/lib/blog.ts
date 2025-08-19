import fs from "fs";
import matter from "gray-matter";
import type { Root, Element, Text } from "hast";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const postsDirectory = path.join(process.cwd(), "content/blog");

// Custom rehype plugin to handle mermaid code blocks
function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      // Check if this is a code element with mermaid class
      if (
        node.tagName === "pre" &&
        node.children?.[0]?.type === "element" &&
        (node.children[0] as Element).tagName === "code"
      ) {
        const codeElement = node.children[0] as Element;
        const className = codeElement.properties?.className;

        if (
          className &&
          Array.isArray(className) &&
          className.includes("language-mermaid")
        ) {
          // Get the content of the code block
          const code = (codeElement.children?.[0] as Text)?.value;

          if (code) {
            // Replace the pre element with a div.mermaid
            node.tagName = "div";
            node.properties = {
              className: ["mermaid"],
              "data-original": code, // Store original content for re-rendering
            };
            node.children = [{ type: "text", value: code }];
          }
        }
      }
    });
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  readTime?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
}

// Get all blog post slugs
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// Get blog post data by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Use unified pipeline with rehype-highlight for syntax highlighting
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeMermaid) // Apply custom mermaid transformation
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);

    const contentHtml = processedContent.toString();

    // Combine the data with the slug and contentHtml
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      content: contentHtml,
      imageUrl: data.imageUrl,
      imageCaption: data.imageCaption,
      readTime: data.readTime,
    };
  } catch {
    return null;
  }
}

// Get all blog posts metadata for listing
export function getAllPosts(): BlogPostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data } = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      readTime: data.readTime,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
