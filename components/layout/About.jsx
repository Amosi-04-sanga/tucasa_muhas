"use client";
import { about_content } from "@/constants";
import { images } from "@/src/images";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const About = () => {
  const { right_arrow } = images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const title = ["Vision", "Mission", "Believes"];

  return (
    <div id="about" className="px-8 sm:px-16">
      <h1 className="pt-16 pb-1 text-center text-primary-dark text-4xl font-bold ">
        About us
      </h1>

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
          <div className="max-w-[350px] shadow-sm py-4 px-2 mt-4 mx-auto">
            <Image
              src={about_content[currentIndex].logo}
              alt={`image_${about_content[currentIndex].title}`}
              width={50}
              height={50}
              className="block mx-auto"
            />
            <h1 className="mt-4 text-center font-bold">
              {" "}
              {about_content[currentIndex].title}{" "}
            </h1>
            <p className="mt-4 text-center">
              {" "}
              {about_content[currentIndex].text}{" "}
            </p>
          </div>
        </Fade>
      </div>

      <div className="max-md:hidden mt-8 md:flex md:gap-8 md:justify-around">
        {about_content.map((content, index) => (
          <Fade key={content.title}>
            <div className="max-w-[300px] mt-16 mx-auto">
              <Image
                src={content.logo}
                alt={`image_${content.title}`}
                width={50}
                height={50}
                className="block mx-auto"
              />
              <h1 className="mt-4 text-center font-bold"> {content.title} </h1>
              <p className="mt-4 text-center"> {content.text} </p>
            </div>
          </Fade>
        ))}
      </div>

      <button className="mt-8 mx-auto block">
        <Link href="/about" className="capitalize text-red-700 font-bold">
          Read More
        </Link>
      </button>
    </div>
  );
};

export default About;
