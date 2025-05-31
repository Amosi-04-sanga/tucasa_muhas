import { footer_links, sociomedia_icons } from '@/constants'
import { images } from '@/src/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Footer = () => {
  const {location, email, facebook, instagram, tiktok, youtube, advent} = images
  return (
    <div className='flex flex-col md:flex-row md:justify-around md:gap-32 px-8 pt-8 min-h-[400px] bg-primary-dark text-white'>
      <div className="mt-8 flex flex-col gap-2 justify-start">
        <div className='flex gap-2'>
           <Image
           src={location}
           alt={'social media icons'}
           width={20}
           height={20}
          />
          <p>Muhas</p>
        </div>

        <div className='flex gap-2'>
           <Image
           src={email}
           alt={'social media icons'}
           width={20}
           height={30}
          />
          <p>tucasamuhas@gmail.com</p>
        </div>
        
      </div>

      <div className='mt-8 flex flex-col gap-2'>
        {
          footer_links.map( (item,index) => (
            <Link key={index} href={item.path}>
             {item.text}
            </Link>
          ))
        }
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <h1>Click to follow us</h1>
           <div className='mt-4 flex gap-2'>
            {
          sociomedia_icons.map( (item,index) => (
            <Link key={index} href={item.path}>
             <Image
           src={item.icon}
           alt={'social media icons'}
           width={35}
           height={35}
          />
            </Link>
          ))
        }
           </div>
      </div>

    </div>
  )
}

export default Footer



/*    {
          announcementData && (announcementData.length > 0) && announcementData
        }*/

          