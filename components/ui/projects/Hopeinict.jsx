import React from 'react'
import { project_content } from '../../../constants'
import Link from 'next/link'
import Image from 'next/image'
import { FadeUp } from '@/components'



const Hopeinict = ({index}) => {
  return (
    <>
      <FadeUp>
              <div className="max-w-[350px] mt-4 mx-auto shadow-md pb-4 px-4 rounded-md border-t-2 border-primary-light border-solid">
                <div className="min-h-[130px]  bg-news_bg_color flex items-center">
                  <Image
                    src={project_content[index].logo}
                    alt={`image_${project_content[index].logo}`}
                    width={`${index === 1 ? 90 : 170}`}
                    height={`${index === 1 ? 90 : 170}`}
                    className="block mx-auto mb-4"
                  />
                </div>
                <p className="mt-2 min-h-[100px]">
                  {" "}
                  {project_content[index].text.slice(0, 110)} {"..."}{" "}
                </p>
                <button className="block px-1 py-1 border-[1px] border-primary-light text-red-700 capitalize mt-1 cursor-pointer">
                  <Link href={project_content[index].path} className="capitalize text-red-700">
                    read more
                  </Link>
                </button>
              </div>
            </FadeUp>
    </>
  )
}

export default Hopeinict