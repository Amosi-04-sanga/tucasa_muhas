"use client";
import React, { useEffect, useState } from "react";
import { gallery_content } from "../../constants";
import Link from "next/link";
import { Fade, Slide } from "react-awesome-reveal";
import { createClient } from "contentful";
import moment from "moment";

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

  const loadMoreHandler = () => {
    console.log("load more");
  };

  return (
    <div className="px-8 mt-16 mb-8 flex flex-col">
      <div className="flex items-center gap-4">
        <div className="w-[4px] h-[25px] shadow-lg bg-primary-dark " />
        <h1 className=" text-3xl font-bold text-primary-dark">
          Event collections
        </h1>
      </div>
      <div className="flex flex-wrap mt-8 gap-4 sm:gap-4 justify-start">
        {photos &&
          photos.length > 0 &&
          photos.map((content, index) => (
            <Fade delay={index * 100} key={index}>
            <Link
              className="rounded-md shadow-md max-w-[150px] block mb-8"
              href={`/gallery/${content.sys.id}`}
            >
              <div className=" w-full">
                <img
                  src={content.fields.coverPhoto.fields.file.url}
                  alt="cover image"
                  className="max-h-[150px]"
                />
              </div>
              <div className="px-2">
                <h2 className="mt-2 text-sm"> {content.fields.title} </h2>
                <div className="mt-1 text-sm flex justify-between">
                  <p className=" text-gray-500">
                    {" "}
                    {content.fields.photos.length} photos
                  </p>
                  <p className="text-gray-500"> {moment(content.fields.date).format("MMM Do YY")} </p>
                </div>
              </div>
            </Link>
          </Fade>
          ))}
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

/*
{gallery_content.map((item, index) => (
          
        ))}
*/
