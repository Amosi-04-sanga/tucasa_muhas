"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SyncLoader } from "react-spinners";
import { images } from "@/src/images";
import { Fullscreen } from "lucide-react";
import { useRef } from "react";
import LightboxModal from "@/components/ui/LightBoxModel";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const entry = React.use(params);
  const { download, tiktok } = images;
  const [initialPhotosLoad, setInitialPhotosLoad] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const imageContainerRef = useRef(null);

  const [viewMode, setViewMode] = useState("grid");

  // State for lightbox
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const Getitems = async () => {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: `ahfy535kiwrz`,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: `lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso`,
      });

      client
        .getEntry(entry.id)
        .then((entry) => {
          setData(entry);
          console.log(entry);
        })
        .catch(console.error);
    };
    Getitems();
  }, []);

  // Handle photo click to open lightbox
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };

  // Handle lightbox navigation
  const handlePrevious = () => {
    const currentIndex = data.fields.photos?.findIndex(
      (photo) => photo.sys?.id === selectedPhoto?.sys?.id
    );
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : data.fields.photos.length - 1;
    setSelectedPhoto(data.fields.photos[previousIndex]);
  };

  const handleNext = () => {
    const currentIndex =
      data &&
      data.fields.photos.findIndex(
        (photo) => photo.sys?.id === selectedPhoto?.sys?.id
      );
    const nextIndex =
      currentIndex < data.fields.photos?.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(data.fields.photos[nextIndex]);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedPhoto(null);
  };



  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file.url;
        const altText = title || "";

        return (
          <img
            className="max-w-[60vw] mx-auto"
            src={imageUrl}
            alt={altText}
            style={{ margin: "16px auto" }}
          />
        );
      },
      "embedded-entry-block": (node) => {
        // Handle other embedded entries, e.g., links to other Contentful content.
        // You can customize the rendering for different content types here.
        return null;
      },
      text: (text) => {
        // You can style text nodes here, e.g., adding CSS classes for headings.
        return (
          <p style={{ paddingTop: "10px" }} className="mt-4">
            {text}
          </p>
        );
      },
      "heading-1": (node) => (
        <h1 className="text-center text-heading1-bold">
          {node.content[0].value}
        </h1>
      ),
      "heading-2": (node) => (
        <h2 className="text-center text-heading2-bold">
          {node.content[0].value}
        </h2>
      ),
      "heading-3": (node) => (
        <h3 className="text-heading3-bold text-center">
          {node.content[0].value}
        </h3>
      ),
      // Add more heading levels as needed.
      hyperlink: (node) => (
        <Link className="text-red-700" href={node.data.uri}>
          {node.content[0].value}
        </Link>
      ),
    },
  };

  const loadMoreHandler = () => {
    if (data && initialPhotosLoad < data.fields.photos.length) {
      setInitialPhotosLoad((prev) => {
        const newsLoad = prev + 20;
        if (newsLoad == data.fields.photos.length) {
          setHasMore(false);
        }

        return newsLoad;
      });
    } else {
      setInitialPhotosLoad(20);
      setHasMore(true);
    }
  };

  return (
    <div className="px-1 md:px-2 mt-8 mb-8 ">
      <h1 className="mt-8 uppercase text-primary-dark max-sm:text-center">
        {" "}
        {data && data.fields.title}{" "}
      </h1>
      <div className="flex flex-wrap justify-start max-sm:justify-around gap-1 mt-4">
        {data && data.fields.photos.length > 0 ? (
          data.fields.photos.slice(0, initialPhotosLoad).map((photo, index) => (
            <div
              onClick={() => handlePhotoClick(photo)}
              className="relative h-[150px] md:h-[250px] w-[170px] md:w-[300px] bg-orange-100"
              key={index}
            >
              <Image
                src={`https:${photo.fields.file.url}?w=500&h=500&fit=fill`}
                alt={`cover_image`}
                fill
                sizes="(max-width: 468px) 50vw, (max-width: 400px) 50vw, 33vw"
                className="object-cover block"
              />

              <button className="absolute top-1 right-1 bg-black/50 text-white p-2 rounded-full hover:scale-125 transition-all duration-300 cursor-pointer">
                <Fullscreen className="w-3 h-3" />
              </button>

             
            </div>
          ))
        ) : (
          <>
            <div className="w-full h-[60vh] flex items-center justify-center">
              <SyncLoader color="#008080" />
            </div>
          </>
        )}
      </div>
      <p className="text-center mt-8 text-red-500">
        {" "}
        <span className="cursor-pointer" onClick={loadMoreHandler}>
          {" "}
          {hasMore ? "load more" : "load less"}{" "}
        </span>{" "}
      </p>

      <LightboxModal
        photo={selectedPhoto}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={true}
        hasNext={true}
        viewMode={viewMode}
      />
    </div>
  );
};

export default page;

/*
data && data.length > 1
*/
