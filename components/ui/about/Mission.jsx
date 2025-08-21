'use client'
import { FadeUp } from '@/components'
import { about_content } from '@/constants'
import { motion, useAnimation, useInView } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect } from 'react'


const Mission = ({currentIndex}) => {
 

  return (
    <motion.div
    className="sm:px-16 shadow-sm py-4 px-2 mt-4 mx-auto">
      <FadeUp>
                  <Image
                    src={about_content[currentIndex].logo}
                    alt={`image_${about_content[currentIndex].title}`}
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
                </motion.div>
  )
}

export default Mission