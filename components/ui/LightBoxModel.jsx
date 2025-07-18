"use client";
import { images } from "@/src/images";
import Image from "next/image";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";



const LightboxModal = ({
  photo,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  viewMode = "grid",
}) => {
  const {download} = images
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle arrow key navigation
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (e.key === "ArrowLeft" && hasPrevious) {
        onPrevious();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleArrowKeys);
    }

    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, [isOpen, hasPrevious, hasNext, onPrevious, onNext]);

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (!isOpen || !photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm"></div>

      {/* Modal Content */}
      <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-1 z-10 p-1 rounded-full border border-zinc-700 bg-opacity-50 hover:border-zinc-500 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Navigation Arrows */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute cursor-pointer left-1 top-1/2 transform translate-y-1/2 z-10 p-3 rounded-full bg-black/40 bg-opacity-50 hover:bg-black/50 transition-colors duration-200"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute cursor-pointer right-1 top-1/2 transform translate-y-1/2 z-10 p-3 rounded-full bg-black/40  hover:bg-black/50 transition-colors duration-200"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        )}

        {/* Image Only */}
        <div className="relative flex flex-col items-center justify-center w-full min-h-[80vh]">
          <Image
            src={
              photo?.fields?.file?.url
                ? `https:${photo.fields.file.url}?w=800&h=800&fit=fill`
                : "/assets/galleryDemo.jpg"
            }
            alt={photo?.fields?.title || "photo"}
            fill
            className="max-h-[80vh] w-auto object-contain rounded-lg shadow-lg mx-auto"
          />
          
          {/* download button */}
          <div
            onClick={() =>
              handleDownload(
                photo.fields.file.url,
                photo.fields.file.url.split("/").pop()
              )
            }
            className="absolute border border-zinc-700 right-1 bottom-1 z-20 bg-black/50 p-1 rounded-full hover:scale-125 transition-all duration-300 cursor-pointer"
          >
            <img
              src={download}
              alt={`download`}
              className="w-[20px] h-[20px] object-cover block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;

<ClipLoader />