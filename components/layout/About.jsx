import { about_content } from "@/constants";
import { images } from "@/src/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";

const About = () => {
  const { right_arrow } = images;

  return (
    <div id="about" className="px-8 sm:px-16">
      <h1 className="pt-16 pb-1 text-center text-primary-dark text-4xl font-bold ">About us</h1>

      <div className="mt-8 md:flex md:gap-8 md:justify-around">
        {about_content.map((content, index) => (
          <Fade key={content.title}>
            <div className="max-w-[300px] mt-16 mx-auto" >
            <Image
              src={content.logo}
              alt={`image_${content.title}`}
              width={70}
              height={70}
              className="block mx-auto"
            />
            <h1 className="mt-4 text-center font-bold"> {content.title} </h1>
            <p className="mt-4 text-center"> {content.text} </p>
          </div>
          </Fade>
        ))}
      </div>

      <button className="mt-16 mx-auto block">
        <Link href="/about" className="capitalize text-red-700 font-bold">
          Read More
        </Link>
      </button>
    </div>
  );
};

export default About;
