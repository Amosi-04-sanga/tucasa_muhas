"use client";
import { createClient } from "contentful";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import Countdown from "../../components/ui/Countdown";
import EventCard from "../../components/ui/EventCard";
import { FadeUp } from "..";

// Image Loader Component
const ImageLoader = ({ src, alt, className, onLoad, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad && onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError && onError();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-tl-md rounded-tr-md"></div>
      )}
      
      {/* Error Placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 rounded-tl-md rounded-tr-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gray-400">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      )}
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-tl-md rounded-tr-md transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};


const News = () => {
  const [initialNewsLoad, setInitialNewsLoad] = useState(3);
  const [initialAnnouncementLoad, setInitialAnnouncementLoad] = useState(3);
  const [announcementData, setAnnouncementData] = useState(null);
  const [NewsData, setNewsData] = useState(null);
  const scrollRef = useRef(null);

  const today = moment().format("YYYY-MM-DD");

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

  
  const filteredEvents = (events) => {
  let upcomingEvents = [];
  let previousEvents = [];

  if (!events) return { upcomingEvents, previousEvents };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // strip time to compare only date

  events.forEach((event) => {
    const eventDate = new Date(event.fields.date);
    eventDate.setHours(0, 0, 0, 0); // strip time for accurate comparison

    if (eventDate >= today) {
      upcomingEvents.push(event);
    } else {
      previousEvents.push(event);
    }
  });

  return { upcomingEvents, previousEvents };
};


  
  const { upcomingEvents, previousEvents } = filteredEvents(NewsData);
  console.log(upcomingEvents)


  return (
    <div className="">
      <div className="text-center pt-16">
        <h1 className="font-bold pb-1 text-3xl text-primary-dark">
          News and Events
        </h1>
      </div>
      <p className="px-4 sm:px-16 mt-4 sm:max-w-[500px] mx-auto">
        Stay updated with the latest news, announcements, and upcoming events.
        Here you'll find everything happening in and around Tucasa Muhas
      </p>

      <h1 className="mx-4 sm:px-16 capitalize font-bold text-xl mt-8">
        {" "}
        📅 upcoming <span className="text-primary-dark"> events </span>{" "}
      </h1>

      <div className="mx-4 sm:mx-16 flex flex-col gap-8 justify-start items-center md:items-start md:justify-center md:flex md:flex-row md:flex-wrap md:gap-8 mt-4">
        {NewsData &&
          upcomingEvents.length > 0 ?
          (upcomingEvents.slice(0, initialNewsLoad).map((content, index) => (
            <Fade key={index}>
              <div className="max-w-[350px] md:min-h-[700px] bg-[#f1f7f7] md:shadow-md rounded-md">
                <div className="mb-0">
                  <ImageLoader
                    src={content.fields.poster.fields.file.url}
                    alt={`poster_${content.fields.title}`}
                    className="h-48 w-full"
                  />
                </div>
                <div className="px-2  pb-4">
                  <div className="pt-2 text-primary-dark font-bold">
                    {
                      <Countdown eventDate={content.fields.date}/>
                    }
                  </div>
                  <p className="mt-1">
                    {content.fields.title}{" "}
                  </p>

                  <button className="block px-2 py-1 text-primary-dark capitalize mt-2 cursor-pointer border-primary-light border-[1px]">
                    <Link href={`/events/${content.sys.id}`}>
                      <p>Read More</p>
                    </Link>
                  </button>
                </div>
              </div>
            </Fade>
          ))) : (
            <div className="flex justify-start w-full">
              <p className="text-left text-primary-dark flex justify-start">No upcoming event</p>
            </div>
          )}
      </div>

      <h1 className="mx-4 sm:mx-16 capitalize font-bold text-xl mt-12">
        {" "}
        📅 Previous<span className="text-primary-dark"> events </span>{" "}
      </h1>

      {/* Preloader for Previous Events */}
      {!NewsData && (
        <div 
          className="mx-4 sm:mx-16 flex gap-4 sm:gap-6 items-stretch py-2 overflow-x-auto overflow-y-hidden h-[300px]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex-shrink-0 w-[320px] h-[280px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg animate-pulse">
              <div className="h-32 bg-gray-300 rounded-t-xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="flex gap-3 mt-4">
                  <div className="h-8 bg-gray-300 rounded-lg flex-1"></div>
                  <div className="h-8 bg-gray-300 rounded-lg flex-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Previous Events Container */}
      {NewsData && (
        <div 
          ref={scrollRef}
          className="mx-4 sm:mx-16 flex gap-4 sm:gap-6 items-stretch py-2 overflow-x-auto overflow-y-hidden h-[350px]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
         {previousEvents.length > 0 &&
           previousEvents.slice(0, initialNewsLoad).map((content, index) => (
             <FadeUp className="flex-shrink-0" key={index}>
               <EventCard
                 title={content.fields.title}
                 eventDate={content.fields.date}
                 posterUrl={content?.fields?.poster?.fields?.file?.url || null}
                 href={`/events/${content.sys.id}`}
               />
             </FadeUp>
           ))}
        </div>
      )}

      {/* No Events Message */}
      {NewsData && previousEvents.length === 0 && (
        <div className="mx-4 sm:mx-16 text-center py-8">
          <p className="text-gray-500 text-lg">No previous events found</p>
        </div>
      )}

      <button className="mt-2 text-red-800 cursor-pointer mx-auto block">
        <Link href="/news">View All</Link>
      </button>

      <div className="mt-12 bg-[#b6dbdb] pt-8">
        <h1 className="text-center font-bold text-2xl capitalize">
          Recent <span className="text-primary-dark"> Announcements </span>{" "}
        </h1>

        <div className="mt-4 px-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 w-fit mx-auto">
          {announcementData &&
            announcementData.length > 0 &&
            announcementData
              .slice(0, initialAnnouncementLoad)
              .map((content, index) => (
                <Fade className="" key={index}>
                  <div className="bg-white shadow-lg max-w-[350px] md:min-h-[300px] p-4 rounded-md">
                    <div className="px-2 pb-4">
                      <p className="mt-2 font-bold"> {content.fields.title}</p>
                      <p className="mt-2">
                        {content.fields.excerpt.slice(0, 100)} {"..."}{" "}
                      </p>

                      <button className="block px-1 py-1 border-[1px] border-primary-light text-red-700 capitalize mt-2 cursor-pointer ">
                        <Link href={`/news/${content.sys.id}`}>
                          <p>Read More</p>
                        </Link>
                      </button>
                    </div>
                  </div>
                </Fade>
              ))}
        </div>

        <button className="mt-8 pb-4 mx-auto block">
          <Link
            href="/news#announcement"
            className="capitalize text-red-700"
          >
            view all
          </Link>
        </button>
      </div>
    </div>
  );
};

export default News;
/*




      <img
                    src={content.fields.poster.fields.file.url}
                    alt={`poster_${content.fields.title}`}
                    className="object-cover w-full rounded-tl-md rounded-tr-md"
                  />
*/

