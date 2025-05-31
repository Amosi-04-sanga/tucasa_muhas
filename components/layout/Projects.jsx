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

        <div className="mt-8  pb-4 flex flex-col gap-4 md:flex md:flex-row md:flex-wrap md:justify-center md:gap-8">
          {project_content.map((content, index) => (
            <Fade cascade={true} key={index}>
              <div className="max-w-[350px] mt-4 mx-auto shadow-md pb-4 px-4 rounded-md">
                <div className="min-h-[130px]  bg-news_bg_color flex items-center">
                  <Image
                    src={content.logo}
                    alt={`image_${content.logo}`}
                    width={`${index === 1 ? 90 : 170}`}
                    height={`${index === 1 ? 90 : 170}`}
                    className="block mx-auto mb-4"
                  />
                </div>
                <p className="mt-2 min-h-[100px]">
                  {" "}
                  {content.text.slice(0, 100)} {"..."}{" "}
                </p>
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
