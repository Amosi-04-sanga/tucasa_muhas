"use client";
import { about_content } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import Timetable from "../ui/Timetable";
import { Believes, Mission, Vision, Worshipprograms } from "..";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openTimetable, setOpenTimetable] = useState(false);
  const title = ["Vision", "Mission", "Believes"];
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

 

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    }
  }, [controls, inView]);

  return (
    <div id="about" className="bg-primary-light">
      <h1 className="pt-16 pb-1 text-center text-primary-dark text-4xl font-bold ">
        About us
      </h1>

      <div className="mx-4 mt-2 sm:mx-16 bg-white rounded-lg">
        <div className="md:hidden">
          <div className="flex gap-4  justify-center items-center">
            {title.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setCurrentIndex(index)}
                  className={`block px-2 py-1 rounded-md text-black capitalize mt-8 cursor-pointer border-primary-light border-[1px] ${
                    index === currentIndex && "bg-primary-light text-black"
                  }`}
                >
                  {item}
                </button>
              </div>
            ))}
          </div>
          <Fade>
           {currentIndex == 0 && <Vision currentIndex = {currentIndex} />}
           {currentIndex == 1 && <Mission currentIndex = {currentIndex} />}
           {currentIndex == 2 && <Believes currentIndex = {currentIndex} />}
          </Fade>
          <button className="py-2 mx-auto block">
        <Link href="/about" className="capitalize text-red-700">
          Read More
        </Link>
      </button>
        </div>

        <motion.div
        className="max-md:hidden mt-8 md:flex md:gap-8 md:justify-around">
          {about_content.map((content, index) => (
            <div key={content.title}>
              <Fade>
              <div className="max-w-[300px] mt-16 mx-auto">
                <Image
                  src={content.logo}
                  alt={`image_${content.title}`}
                  width={50}
                  height={50}
                  className="block mx-auto"
                />
                <h1 className="mt-4 text-center font-bold">
                  {" "}
                  {content.title}{" "}
                </h1>
                <p className="mt-4 text-center"> {content.text} </p>
              </div>
            </Fade>
            <button className="py-2 mx-auto block">
        <Link href="/about" className="capitalize text-red-700">
          Read More
        </Link>
      </button>
            </div>
            
          ))}
        </motion.div>
        
      </div>

      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="mt-12 w-full mx-auto max-w-[600px]"
      >
        <h2 className="uppercase text-center text-primary-dark font-bold">
          worship services
        </h2>
        <Worshipprograms />
        <div className="mt-4">

          <AnimatePresence>
        {openTimetable && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm p-2 bg-white rounded shadow"
          >
            <Fade >
            <div >
              <Timetable />
            </div>
          </Fade>
          </motion.div>
        )}
      </AnimatePresence>

         
          <p
            className="cursor-pointer text-center pt-2 pb-"
          >
            <span
              onClick={() => setOpenTimetable(!openTimetable)}
              className="text-red-600"
            >
              {" "}
              {openTimetable ? "hide timetable" : "view timetable"}{" "}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
