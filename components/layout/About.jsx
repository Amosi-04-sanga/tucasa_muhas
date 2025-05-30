import { about_content } from "@/constants";
import { images } from "@/src/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  const { right_arrow } = images;

  return (
    <div className="px-8 sm:px-16">
      <div className="text-center">
        <h1 className='pt-16 pb-1 inline-block text-3xl font-bold relative before:absolute before:content-[""] before:left-0 before:bottom-0 before:w-[40%] before:h-[4px] before:bg-primary-dark before:opacity-50 '>
          About us
        </h1>
      </div>

      <div className="mt-8 md:flex md:gap-8">
        {about_content.map((content, index) => (
          <div className="max-w-[300px] mt-16 mx-auto" key={content.title}>
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
