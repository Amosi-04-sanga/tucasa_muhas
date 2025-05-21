import { blog_content } from "@/constants";
import Link from "next/link";
import React from "react";

const Blog = () => {
  return (
    <div className="mt-16 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40">
      <div className="text-center">
        <h1 className="relative inline-block before:absolute before:left-0 before:bottom-0 before:w-[40%] before:h-[4px] before:bg-primary-dark before:opacity-50 pb-1 text-3xl font-bold">
          Articles and Sermons
        </h1>
      </div>

      <p className="mt-4">
        Explore inspiring sermons and thought-provoking articles that offer
        spiritual guidance, personal growth, and deeper understanding of faith."
      </p>

      <div className="mt-4 flex flex-col gap-4 justify-center items-center md:flex-row flex-wrap">
        {blog_content.map((content, index) => (
          <div className="max-w-[400px] shadow-md rounded-md" key={index}>
            <div className="max-h-[500px]">
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
                {content.exerpt} {"..."}{" "}
              </p>

              <button className=" mx-auto block px-2 py-1 rounded-md text-primary-dark capitalize mt-8 cursor-pointer border-primary-light border-[1px]">
                <Link href="#">
                  <p>Read More</p>
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 mx-auto block">
        <Link href="#" className="capitalize text-red-700 font-bold">
          view all
        </Link>
      </button>
    </div>
  );
};

export default Blog;
