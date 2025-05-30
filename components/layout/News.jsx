"use client";
import { anouncenmnts_content, upcoming_events_content } from "@/constants";
import { createClient } from "contentful";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";


const News = () => {
  const [initialNewsLoad, setInitialNewsLoad] = useState(3);
  const [initialAnnouncementLoad, setInitialAnnouncementLoad] = useState(3);
const [announcementData, setAnnouncementData] = useState(null)

  
  useEffect(() => {
    const getitems = async () => {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: `ahfy535kiwrz`,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: `lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso`,
      });

      const response = await client.getEntries({content_type: 'announcement'});
      setAnnouncementData(response.items);
      
      console.log('welcome')
    };
    getitems();
  }, []);
 

  return (
    <div className="mt-16 mb-8 px-8 sm:px-16">
      <div className="text-center pt-16">
        <h1 className='font-bold pb-1 text-3xl relative before:absolute before:content-[""] before:left-0 before:bottom-0 before:w-[40%] before:h-[4px] before:bg-primary-dark before:opacity-50 inline-block '>
          News and Events
        </h1>
      </div>
      <p className="mt-4 sm:max-w-[500px] mx-auto">
        Stay updated with the latest news, announcements, and upcoming events.
        Here you'll find everything happening in and around our organization
      </p>

      <h1 className="capitalize text-center font-bold text-xl mt-8">
        {" "}
        upcoming <span className="text-primary-dark"> events </span>{" "}
      </h1>

      <div className="flex flex-col gap-8 justify-center items-center  md:flex md:flex-row md:flex-wrap md:gap-8 mt-4">
        {upcoming_events_content
          .slice(0, initialNewsLoad)
          .map((content, index) => (
            <Fade key={index}>
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
                    {content.excerpt.slice(0, 100)} {"..."}{" "}
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
        className="mt-8 text-red-800 font-bold cursor-pointer mx-auto block"
      >
        
        <Link href='/news'>
            View All
        </Link>
      </button>

      <div className="mt-16">
        <h1 className="text-center font-bold text-2xl capitalize">
          Recent <span className="text-primary-dark"> Announcements </span>{" "}
        </h1>

        <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 w-fit mx-auto">
           {
          announcementData && (announcementData.length > 0) && announcementData.slice(0, initialAnnouncementLoad).map((content, index) => (
            <Fade key={index}>
           
            <div className="max-w-[350px] p-4 shadow-md rounded-lg">
             
              <div className="px-2 pb-4">
                <p className="mt-4 font-bold">
                  {" "}
                  {content.fields.title}
                </p>
                <p className="mt-4">
                  {content.fields.description.slice(0, 100)} {"..."}{" "} 
                </p>

                <button className=" mx-auto block px-2 py-1 rounded-md text-red-700 capitalize mt-4 cursor-pointer ">
                  <Link href="#">
                    <p>Read More</p>
                  </Link>
                </button>
              </div>
            </div>
          </Fade>
          ))
        }
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


/*


*/
