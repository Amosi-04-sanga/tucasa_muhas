import { anouncenmnts_content, upcoming_events_content } from "@/constants";
import Link from "next/link";
import React from "react";

const News = () => {
  return (
    <div className="mt-16 mb-8 px-8 sm:px-16">
      <div className="text-center pt-16">
        <h1 className='font-bold pb-1 text-3xl relative before:absolute before:content-[""] before:left-0 before:bottom-0 before:w-[40%] before:h-[4px] before:bg-primary-dark before:opacity-50 inline-block '>
          News and Events
        </h1>
      </div>
      <p className="mt-4">
        Stay updated with the latest news, announcements, and upcoming events.
        Here you'll find everything happening in and around our organization
      </p>

      <h1 className="capitalize text-center font-bold text-xl mt-8">
        {" "}
        upcoming <span className="text-primary-dark"> events </span>{" "}
      </h1>

      <div className="flex flex-col gap-8 md:flex md:gap-8 mt-4">
        {upcoming_events_content.map((content, index) => (
          <div className="max-w-[400px] shadow-md rounded-md" key={index}>
            <div className="max-h-[500px]">
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
        ))}
      </div>

      <button className="mt-8 mx-auto block">
        <Link href="#" className="capitalize text-red-700 font-bold">
          view all
        </Link>
      </button>

      <div className="mt-16">
        <h1 className="text-center font-bold text-2xl capitalize">
          Recent <span className="text-primary-dark"> news </span> and{" "}
          <span className="text-primary-dark"> Announcements </span>{" "}
        </h1>

        <div className="mt-4 flex flex-col gap-2">
          {anouncenmnts_content.map((content, index) => (
            <div key={index}>
              <Link className="text-red-500" href="#">
                {content.text} {"..."}
              </Link>
            </div>
          ))}
        </div>

        <button className="mt-8 pb-4 mx-auto block">
          <Link href="#" className="capitalize text-red-700 font-bold">
            view all
          </Link>
        </button>
      </div>
    </div>
  );
};

export default News;
