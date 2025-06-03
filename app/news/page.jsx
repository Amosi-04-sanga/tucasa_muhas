"use client";
import { anouncenmnts_content, upcoming_events_content } from "@/constants";
import { createClient } from "contentful";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const News = () => {
  const [NewsData, setNewsData] = useState(null);
  const [announcementData, setAnnouncementData] = useState(null);

  const today = moment().format("YYYY-MM-DD");
  console.log(today);

  useEffect(() => {
    const getitems = async () => {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: "ahfy535kiwrz",
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: "lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso",
      });

      const response = await client.getEntries({
        content_type: "announcement",
      });
      setAnnouncementData(response.items);

      console.log("welcome");
    };
    getitems();
  }, []);

  useEffect(() => {
    const getitems = async () => {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: "ahfy535kiwrz",
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: "lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso",
      });

      const response = await client.getEntries({
        content_type: "upcomingEvents",
      });
      setNewsData(response.items);
    };
    getitems();
  }, []);

  return (
    <div className="mt-16 mb-8 px-4 sm:px-8">
      <div className="flex items-center gap-4">
        <div className="w-[4px] h-[25px] shadow-lg bg-primary-dark " />
        <h1 className=" text-3xl font-bold">
          All <span className="text-primary-dark"> events </span>{" "}
        </h1>
      </div>

      <div className="flex flex-col gap-4 md:gap-8 justify-start items-center md:items-start md:flex md:flex-row md:flex-wrap mt-4">
        {NewsData &&
          NewsData.length > 0 &&
          NewsData.map((content, index) => (
            <Fade key={index}>
              <div className="max-w-[350px] rounded-md">
                <div className="mb-0">
                  <img
                    src={content.fields.poster.fields.file.url}
                    alt={`poster_${content.fields.title}`}
                    className="object-cover w-full rounded-tl-md rounded-tr-md"
                  />
                </div>
                <div className="px-2 pb-4">
                  <p className="mt-4 text-primary-dark font-bold">
                    {" "}
                    {moment(content.fields.date).fromNow()} to Go!{" "}
                  </p>
                  <p className="mt-4">
                    {content.fields.description.slice(0, 100)} {"..."}{" "}
                  </p>

                  <button className=" mx-auto block px-2 py-1 rounded-md text-primary-dark capitalize mt-8 cursor-pointer border-primary-light border-[1px]">
                    <Link href={`/events/${content.sys.id}`}>
                      <p>Read More</p>
                    </Link>
                  </button>
                </div>
              </div>
            </Fade>
          ))}
      </div>

      <div id="announcement" className="pt-32">
        <h1 className="text-center font-bold text-2xl capitalize">
          Recent <span className="text-primary-dark"> Announcements </span>{" "}
        </h1>

        <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 w-fit mx-auto">
          {announcementData &&
            announcementData.length > 0 &&
            announcementData.map((content, index) => (
              <Fade key={index}>
                <div className="max-w-[350px] p-4 rounded-lg">
                  <div className="px-2 pb-4">
                    <p className="mt-4 font-bold"> {content.fields.title}</p>
                    <p className="mt-4">
                      {content.fields.description.slice(0, 100)} {"..."}{" "}
                    </p>

                    <button className=" mx-auto block px-2 py-1 rounded-md text-red-700 capitalize mt-4 cursor-pointer ">
                      <Link href={`/news/${content.sys.id}`}>
                        <p>Read More</p>
                      </Link>
                    </button>
                  </div>
                </div>
              </Fade>
            ))}
        </div>
      </div>
    </div>
  );
};

export default News;

/*


*/
