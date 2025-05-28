"use client";

import CopyUrlButton from "@/components/CopyUrlButton";
import ImageModal from "@/components/ImageModal";
import type { BlogPost } from "@/lib/blog";
import arrowLeftIcon from "@iconify-icons/tabler/arrow-left";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPostClientViewProps {
  post: BlogPost;
  authorName?: string; // Example: if you want to pass author name from server
  authorTitle?: string; // Example: if you want to pass author title from server
}

export default function BlogPostClientView({
  post,
  authorName = "Nilesh Kumar",
  authorTitle = "Web Developer",
}: BlogPostClientViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);
  const [modalImageAlt, setModalImageAlt] = useState<string | undefined>(
    undefined
  );

  // Function to add click event listeners to images
  const attachImageClickListeners = () => {
    const contentElement = document.querySelector(".blog-content");
    if (contentElement) {
      const images = contentElement.getElementsByTagName("img");
      const clickHandler = (event: Event) => {
        const img = event.currentTarget as HTMLImageElement;
        setModalImageSrc(img.src);
        setModalImageAlt(img.alt);
        setIsModalOpen(true);
      };

      Array.from(images).forEach((img) => {
        img.style.maxWidth = "100%"; // Consider moving to CSS
        img.style.height = "auto"; // Maintain aspect ratio
        img.style.cursor = "pointer";
        // Remove any existing listeners to prevent duplicates
        img.removeEventListener("click", clickHandler);
        // Add the click listener
        img.addEventListener("click", clickHandler);
      });

      return () => {
        Array.from(images).forEach((img) => {
          img.removeEventListener("click", clickHandler);
        });
      };
    }
  };

  // Initial setup of image click listeners
  useEffect(() => {
    return attachImageClickListeners();
  }, [post]); // Rerun when post content might change

  // Reattach listeners when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      attachImageClickListeners();
    }
  }, [isModalOpen]);

  const openModalWithImage = (src: string, alt?: string) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalImageSrc(null);
  };

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
              <Icon icon={arrowLeftIcon} width={20} height={20} />
              <span>{authorName}</span>
            </div>
          </Link>
          <CopyUrlButton />
        </div>
        <p className="text-muted mb-4">{authorTitle}</p>
      </header>

      {/* Hero Image */}
      {post.imageUrl && (
        <div className="container-width mb-16">
          <div
            className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openModalWithImage(post.imageUrl!, post.title)}
          >
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
          className="blog-content" // Images inside this div will be made clickable
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Footer */}
      <footer className="container-width pb-8 text-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {authorName.split(" ")[0]}.
        </p>
      </footer>

      {/* Image Modal */}
      {isModalOpen && modalImageSrc && (
        <ImageModal
          src={modalImageSrc}
          alt={modalImageAlt}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
