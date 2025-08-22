'use client'
import React, { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Hopeinict, Kai, MuhassoLoundry } from "..";
import { images } from "@/src/images";


const Projects = () => {
 const {projects_bg} = images
  const [currentIndex, setCurrentIndex] = useState(0)
  const project = ['Hope in ICT', 'Kai', 'Muhasso Loundry']
  return (
    <div className="relative mx-auto max-w-[500px] px-4 sm:px-16 pb-8">
      <img
        src={projects_bg}
        alt="bg"
        className="w-full h-full absolute left-0 top-0 -z-20"
      />
      <div>
        <div className="text-center pt-16">
          <h1 className='font-bold pb-1 text-3xl text-primary-dark relative before:absolute before:content-[""] before:left-0 before:bottom-0 before:w-[40%] before:h-[4px] before:bg-white before:opacity-50 inline-block '>
            Projects
          </h1>
        </div>
        <div className="mt-2 flex justify-center gap-4 items-center">
          {
            project.map( (item, index) => (
                <div key={index}>
                <button
                  onClick={() => setCurrentIndex(index)}
                  className={`block px-2 py-1 rounded-md text-black capitalize mt-2 cursor-pointer border-primary-light border-[1px] ${
                    index === currentIndex && "bg-primary-light text-black text-sm"
                  }`}
                >
                  {item}
                </button>
              </div>
            ))
          }
        </div>

        <Fade className="mt-2 pb-4 flex flex-col gap-4 md:flex md:flex-row md:flex-wrap md:justify-center md:gap-8">
          {currentIndex == 0 && <Hopeinict index = {currentIndex} />}
          {currentIndex == 1 && <MuhassoLoundry index = {currentIndex}/>}
          {currentIndex == 2 && <Kai index = {currentIndex} />}
        </Fade>
      </div>
    </div>
  );
};

export default Projects;
