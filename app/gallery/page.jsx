'use client'
import React, { useState } from "react";
import { gallery_content } from "../../constants";
import Link from "next/link";


const page = () => {
  const [hasMore, setHasMore] = useState(true)

  const loadMoreHandler = () => {
    console.log('load more');
    
  }
  return (
    <div className="px-8 mt-16 mb-8 flex flex-col gap-8">
      <h1 className="flex justify-start text-3xl font-bold text-primary-dark">
        Event collections
      </h1>
      <div className="flex flex-wrap gap-4 justify-start">
        {gallery_content.map((item, index) => (
          <Link
            className="rounded-md shadow-md max-w-[200px] block mb-8"
            href={`/gallery/${item.id}`}
            key={index}
          >
            <div className=" max-h-[300px] w-full">
              <img src={item.coverImage} alt="cover image" />
            </div>
            <div className="px-2">
              <h2 className="mt-2"> {item.title} </h2>
              <div className="mt-1 flex justify-between">
                <p className=" text-gray-500"> {item.photos.length} items</p>
                <p className="text-gray-500"> {item.date} </p>
              </div>
            </div>
          </Link>
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
