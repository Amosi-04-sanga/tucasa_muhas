import React from 'react'
import { about_content } from '../../../constants'
import Image from 'next/image'
import { FadeUp } from '@/components'


const Believes = ({currentIndex}) => {
  return (
         <div className="sm:px-16 shadow-sm py-4 px-2 mt-4 mx-auto">
          <FadeUp>
              <Image
                src={about_content[currentIndex].logo}
                alt={`image_${about_content[2].title}`}
                width={50}
                height={50}
                priority
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
              </FadeUp>
            </div>
  )
}

export default Believes