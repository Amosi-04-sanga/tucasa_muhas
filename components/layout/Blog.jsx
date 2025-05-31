"use client";
import { blog_content } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const Blog = () => {
const [initialArticlesLoad, setInitialArticlesLoad] = useState(3)

  return (
    <div className=" pb-16 px-8 sm:px-16 ">
      <div className="text-center pt-32">
        <h1 className="relative inline-block before:absolute before:left-0 before:bottom-0 before:w-[40%] before:h-[4px] before:bg-primary-dark before:opacity-50 pb-1 text-3xl font-bold">
          Articles and Sermons
        </h1>
      </div>

      <p className="mt-8 sm:max-w-[500px] mx-auto">
        Explore inspiring sermons and thought-provoking articles that offer
        spiritual guidance, personal growth, and deeper understanding of faith."
      </p>

      <div className="mt-8 flex flex-col gap-8 justify-center items-center md:flex-row flex-wrap">
        {blog_content.slice(0, initialArticlesLoad).map((content, index) => (
          <Fade key={index}>
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

      <button className="mt-16 mx-auto block cursor-pointer">
        <Link href="/blog">
          <p className="capitalize text-red-700 font-bold"> {"View All"} </p>
        </Link>
      </button>
    </div>
  );
};

export default Blog;
