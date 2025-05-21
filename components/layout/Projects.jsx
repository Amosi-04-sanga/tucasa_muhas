import { project_content } from "@/constants";
import { images } from "@/src/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Projects = () => {
  const { projects_bg } = images;
  return (
    <div className="relative mt-16 px-8 sm:px-16 pb-16">
      <img
        src={projects_bg}
        alt="bg"
        className="w-full h-full absolute left-0 top-0"
      />
      <div>
        <div className="text-center pt-16">
          <h1 className='font-bold pb-1 text-3xl relative before:absolute before:content-[""] before:left-0 before:bottom-0 before:w-[40%] before:h-[4px] before:bg-primary-dark before:opacity-50 inline-block '>
            Projects
          </h1>
        </div>

        <div className="mt-4 pb-4 flex flex-col gap-8 md:flex md:gap-8">
          {project_content.map((content, index) => (
            <Fade direction="" delay={index * 50} cascade={true} key={index}>
              <div className="max-w-[300px] mt-4 mx-auto shadow-md pb-4 px-4 rounded-md">
                <Image
                  src={content.logo}
                  alt={`image_${content.logo}`}
                  width={170}
                  height={170}
                  className="block mx-auto"
                />
                <p className="mt-2"> {content.text} </p>
                <button className="mt-8 mx-auto block">
                  <Link href="#" className="capitalize text-red-700 font-bold">
                    More
                  </Link>
                </button>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
