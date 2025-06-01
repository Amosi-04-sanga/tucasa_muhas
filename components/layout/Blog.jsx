"use client";
import { blog_content } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { createClient } from "contentful";

const Blog = () => {
  const [initialArticlesLoad, setInitialArticlesLoad] = useState(3);
  const [articlesData, setArticlesData] = useState(3);

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
      <div className="text-center pt-32">
        <h1 className="text-primary-dark text-3xl font-bold">
          Articles and Sermons
        </h1>
      </div>

      <p className="mt-8 sm:max-w-[500px] mx-auto">
        Explore inspiring sermons and thought-provoking articles that offer
        spiritual guidance, personal growth, and deeper understanding of faith."
      </p>

      <div className="mt-8 flex flex-col gap-8 justify-center items-center md:flex-row flex-wrap">
        {articlesData &&
          articlesData.length > 0 &&
          articlesData.slice(0, initialArticlesLoad).map((content, index) => (
            <Fade key={index}>
              <div className="max-w-[350px] shadow-md rounded-md">
                <div className="">
                  <img
                    src={content.fields.image.fields.file.url}
                    alt={`poster`}
                    className="object-cover w-full max-h-[300px] rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-2 pb-4">
                  <p className="mt-4 text-primary-dark font-bold">
                    {" "}
                    {content.fields.title}
                  </p>
                  <p className="mt-4">
                    {content.fields.exerpt.slice(0, 100)} {"..."}{" "}
                  </p>

                  <button className=" mx-auto block px-2 py-1 rounded-md text-primary-dark capitalize mt-8 cursor-pointer border-primary-light border-[1px]">
                    <Link href={`/blog/${content.sys.id}`}>
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

/*




            <img
                    src={content.fields.poster.fields.file.url}
                    alt={`poster_${content.fields.title}`}
                    className="object-cover w-full rounded-tl-md rounded-tr-md"
                  />
*/
