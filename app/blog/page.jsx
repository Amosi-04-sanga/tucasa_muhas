"use client";
import { blog_content } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const page = () => {
  const [postsLoad, setPostsLoad] = useState(4);
  const [hasMore, SetHasMore] = useState(true);

  const loadMoreHandler = () => {
    if (postsLoad < blog_content.length) {
      setPostsLoad((prev) => {
        const newsLoad = prev + 2;
        if (newsLoad == blog_content.length) {
          SetHasMore(false);
        }

        return newsLoad;
      });
    } else {
      setPostsLoad(4);
      SetHasMore(true);
    }
  };


  return (
    <div className="mt-16 mb-16 px-8 sm:px-16 flex flex-col ">
       <div className="flex items-center gap-4">
        <div className="w-[4px] h-[25px] shadow-lg bg-primary-dark "/>
        <h1 className=" text-3xl font-bold text-primary-dark">
          All Articles
        </h1>
      </div>


      <div className="mt-8 flex flex-col gap-4 justify-center items-center md:flex-row md:justify-start flex-wrap">
        {blog_content.slice(0, postsLoad).map((content, index) => (
          <Fade delay={index * 150} key={index}>
            <div className="max-w-[350px] shadow-md rounded-md">
              <div className="max-h-[400px]">
                <img
                  src={content.featured_image}
                  alt={`poster_${content.title}`}
                  className="object-cover w-full h-full rounded-tl-md rounded-tr-md"
                />
              </div>
              <div className="px-2 pb-4">
                <p className="mt-4 text-primary-dark font-bold">
                  {" "}
                  {content.title}
                </p>
                <p className="mt-4">
                  {content.exerpt.slice(0, 100)} {"..."}{" "}
                </p>

                <button className=" mx-auto block px-2 py-1 rounded-md text-primary-dark capitalize mt-8 cursor-pointer border-primary-light border-[1px]">
                  <Link href="#">
                    <p>Read More</p>
                  </Link>
                </button>
              </div>
            </div>
          </Fade>
        ))}
      </div>

      <button
        onClick={loadMoreHandler}
        className="mt-8 text-red-800 font-bold cursor-pointer mx-auto "
      >
        {hasMore ? "Load More" : "View Less"}
      </button>
    </div>
  );
};

export default page;
