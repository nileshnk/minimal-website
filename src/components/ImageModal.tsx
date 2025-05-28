"use client";

import closeIcon from "@iconify-icons/tabler/x";
import { Icon } from "@iconify/react";

interface ImageModalProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

export default function ImageModal({
  src,
  alt = "Full-size image",
  onClose,
}: ImageModalProps) {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-neutral-900 p-2 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image/padding
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-1 bg-neutral-800 rounded-full text-white hover:bg-neutral-700 transition-colors"
          aria-label="Close image viewer"
        >
          <Icon icon={closeIcon} width={20} height={20} />
        </button>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Using a standard img tag here for simplicity in modal, or could use Next/Image if benefits are needed */}
          {/* For now, assuming src is already optimized or a direct link */}
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[85vh] object-contain rounded"
            id="image-modal-title"
          />
        </div>
      </div>
    </div>
  );
}
