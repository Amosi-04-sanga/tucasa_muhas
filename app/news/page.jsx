"use client";
import { anouncenmnts_content, upcoming_events_content } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const Page = () => {
  const [initialNewsLoad, setInitialNewsLoad] = useState(4);
  const [hasMore, SetHasMore] = useState(true);

  const loadMoreHandler = () => {
    if (initialNewsLoad < upcoming_events_content.length) {
      console.log("running...");
      setInitialNewsLoad((prev) => {
        const newsLoad = prev + 2;
        if (newsLoad == upcoming_events_content.length) {
          SetHasMore(false);
        }

        return newsLoad;
      });
    } else {
      setInitialNewsLoad(4);
      SetHasMore(true);
    }
  };

  return (
    <div className="mt-16 mb-8 px-8 sm:px-16">
      

       <div className="flex items-center gap-4">
        <div className="w-[4px] h-[25px] shadow-lg bg-primary-dark "/>
        <h1 className=" text-3xl font-bold text-primary-dark">
          All Events
        </h1>
      </div>

      <div className="flex flex-col gap-8 justify-center items-center  md:flex md:flex-row md:flex-wrap md:justify-start md:gap-8 mt-8">
        {upcoming_events_content
          .slice(0, initialNewsLoad)
          .map((content, index) => (
            <Fade key={index} delay={index * 150}>
              <div className="max-w-[350px] shadow-md rounded-md">
                <div className="max-h-[400px]">
                  <img
                    src={content.poster}
                    alt={`poster_${content.poster}`}
                    className="object-cover w-full h-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-2 pb-4">
                  <p className="mt-4 text-primary-dark font-bold">
                    {" "}
                    {content.remainder} to Go!{" "}
                  </p>
                  <p className="mt-4">
                    {content.excerpt} {"..."}{" "}
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
        className="mt-8 text-red-800 font-bold cursor-pointer mx-auto block"
      >
        {hasMore ? "Load More" : "View Less"}
      </button>

    
    </div>
  );
};

export default Page;
