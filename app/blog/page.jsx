"use client";
import { blog_content } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { createClient } from "contentful";

const page = () => {
  const [initialArticlesLoad, setInitialArticlesLoad] = useState(3);
  const [articlesData, setArticlesData] = useState(3);

  const loadMoreHandler = () => {
    if (postsLoad < articlesData.fields.length) {
      setPostsLoad((prev) => {
        const newsLoad = prev + 2;
        if (newsLoad == articlesData.fields.length) {
          SetHasMore(false);
        }

        return newsLoad;
      });
    } else {
      setPostsLoad(4);
      SetHasMore(true);
    }
  };

  useEffect(() => {
    const getitems = async () => {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: "ahfy535kiwrz",
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: "lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso",
      });

      const response = await client.getEntries({ content_type: "articles" });
      setArticlesData(response.items);
    };
    getitems();
  }, []);

  return (
    <div className=" pb-16 px-8 sm:px-16 ">
      <div className="flex items-center gap-4 mt-8">
        <div className="w-[4px] h-[25px] shadow-lg bg-primary-dark " />
        <h1 className=" text-3xl font-bold text-primary-dark">All Articles</h1>
      </div>

      <div className="mt-8 flex flex-col gap-8 justify-center items-center md:flex-row flex-wrap">
        {articlesData &&
          articlesData.length > 0 &&
          articlesData.slice(0, initialArticlesLoad).map((content, index) => (
            <Fade key={index}>
              <div className="max-w-[350px] shadow-md rounded-md">
                <div className="h-[150px] md:h-[200px]">
                  <img
                    src={content.fields.image.fields.file.url}
                    alt={`poster`}
                    className="object-cover w-full h-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-2 pb-4">
                  <p className="mt-4 text-primary-dark font-bold">
                    {" "}
                    {content.fields.title}
                  </p>
                  <p className="mt-4">
                    {content.fields.exerpt.slice(0, 85)} {"..."}{" "}
                  </p>

                  <button className=" mx-auto block px-2 py-1 rounded-md text-primary-dark capitalize mt-4 cursor-pointer border-primary-light border-[1px]">
                    <Link href={`/blog/${content.sys.id}`}>
                      <p>Read More</p>
                    </Link>
                  </button>
                </div>
              </div>
            </Fade>
          ))}
      </div>

      <button onClick={loadMoreHandler} className="mt-16 mx-auto block cursor-pointer">
        <p className="capitalize text-red-700 font-bold"> Load More </p>
      </button>
    </div>
  );
};

export default page;

/*
  
*/
