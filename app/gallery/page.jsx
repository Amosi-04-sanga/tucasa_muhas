"use client";
import React, { useEffect, useState } from "react";
import { gallery_content } from "../../constants";
import Link from "next/link";
import { Fade, Slide } from "react-awesome-reveal";
import { createClient } from "contentful";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import Image from "next/image";

const page = () => {
  const [hasMore, setHasMore] = useState(true);
  const [initialPhotosLoad, setInitialPhotosLoad] = useState(20);
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const getitems = async () => {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: "ahfy535kiwrz",
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: "lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso",
      });

      const response = await client.getEntries({ content_type: "gallery" });
      setPhotos(response.items);
    };
    getitems();
  }, []);

  {
    /*load more handler*/
  }
  const loadMoreHandler = () => {
    console.log("load more");
  };

  return (
    <div className="px-2 md:px-8 mt-16 mb-8 flex flex-col">
      <div className="flex items-center gap-4">
        <div className="w-[4px] h-[25px] shadow-lg bg-primary-dark " />
        <h1 className=" text-3xl font-bold text-primary-dark">
          Event collections
        </h1>
      </div>
      <div className="flex flex-wrap justify-start mt-8 gap-1 md:gap-2">
        {photos && photos.length > 0 ? (
          photos.map((content, index) => (
            <Link
              key={index}
              className="rounded-md shadow-md w-[160px] md:w-[230px] block mb-2"
              href={`/gallery/${content.sys.id}`}
            >
              <div className="relative w-[160px] md:w-[230px] h-[100px] md:h-[200px]">
                <Image
                  src={`https:${content.fields.coverPhoto.fields.file.url}?w=500&h=500&fit=fill`}
                  alt="cover image"
                  fill
                  sizes="(max-width: 468px) 50vw, (max-width: 400px) 50vw, 43vw"
                  className="object-cover"
                />
              </div>
              <div className="px-1">
                <h2 className="mt-1 min-h-[35px] bg-orange-100 text-[12px] uppercase">
                  {" "}
                  {content.fields.title}{" "}
                </h2>
                <div className="mt-1 text-sm flex justify-between">
                  <p className=" text-gray-500">
                    {" "}
                    {content.fields.photos.length} photos
                  </p>
                  <p className="text-gray-500">
                    {" "}
                    {moment(content.fields.date).format("MMM Do YY")}{" "}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <>
            <div className="w-full h-[60vh] flex items-center justify-center">
              <SyncLoader color="#008080" />
            </div>
          </>
        )}
      </div>

      <button
        onClick={loadMoreHandler}
        className="mt-8 text-red-800 font-bold cursor-pointer mx-auto block"
      >
        {hasMore ? "Load More" : "View Less"}
      </button>
    </div>
  );
};

export default page;
