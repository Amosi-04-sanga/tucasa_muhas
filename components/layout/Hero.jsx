"use client";
import { images } from "@/src/images";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import { hero_slideshow } from "../../constants";
import { Fade, Slide } from "react-awesome-reveal";
import Link from "next/link";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(false);

  const { right_arrow } = images;

  const toLeftHandler = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(
      isFirstSlide ? hero_slideshow.length - 1 : currentIndex - 1
    );
  };

  const toRightHandler = () => {
    const isLastSlide = currentIndex === hero_slideshow.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      toRightHandler();
    }, 5000);

    const zoomInterval = setInterval(() => {
      setZoomImage(true);
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(zoomInterval);
      setZoomImage(false);
    };
  }, [currentIndex]);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="bg-[#333] absolute left-0 top-0 z-10 h-[100vh] w-full opacity-[.6]" />
        <div className={``}>
          <img
            src={hero_slideshow[currentIndex].url}
            alt="hero image"
            className={`w-full h-[100vh] object-cover origin-center opacity-50 ${
              zoomImage &&
              "transition-opacity ease-out duration-1000 opacity-100"
            }`}
          />
        </div>
        <div className="flex flex-col justify-center items-center absolute left-[50%] -translate-x-2/4 top-[50%] -translate-y-2/4 z-20 h-[90vh] max-sm:w-auto text-center text-white">
          <Fade className="sm:w-[450px] max-sm:w-[300px]">
            <h1 className="text-xl md:text-2xl uppercase"> {hero_slideshow[currentIndex].title} </h1>
            <div className="mt-4 font-bold text-5xl md:text-6xl ">
              {" "}
              <span>{hero_slideshow[currentIndex].description}</span> {" "} {currentIndex === 2 &&  <span className="text-primary-light text-[22px] italic">Hebrews 13:1</span> }
            </div>
          </Fade>
          <Slide direction="up">
            {hero_slideshow[currentIndex].btn && (
             <Link href='#about'>
              <button className={`p-4 rounded-md text-white capitalize mt-16 cursor-pointer border-gray-500 border-[1px]`}>
                <div className="flex gap-2">
                  <Image
                    src={right_arrow}
                    alt="icon"
                    width={20}
                    height={20}
                    className="rotate-90"
                  />
                </div>
              </button>
             </Link>
            )}
          </Slide>
        </div>
        <button
          onClick={toLeftHandler}
          className="absolute z-20 left-4 top-[50%] border-white border-1 rounded-full p-2 translate-y-2/4 cursor-pointer text-white font-bold uppercase"
        >
          <Image
            src={right_arrow}
            alt="icon"
            width={20}
            height={20}
            className="rotate-180"
          />
        </button>
        <button
          onClick={toRightHandler}
          className="absolute z-20 right-4 top-[50%] border-white border-1 rounded-full p-2 translate-y-2/4 cursor-pointer text-white font-bold uppercase"
        >
          <Image
            src={right_arrow}
            alt="icon"
            width={20}
            height={20}
            className=""
          />
        </button>
      </div>
    </>
  );
};

export default Hero;

