'use client'
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { createClient } from "contentful";
import Link from "next/link";


const OurTeam = () => {
const [leadersData, setLeadersData] = useState([])
const displayData = React.useMemo(() => (leadersData && leadersData.length ? leadersData.concat(leadersData) : []), [leadersData])

    useEffect(() => {
        const getitems = async () => {
          const client = createClient({
            // This is the space ID. A space is like a project folder in Contentful terms
            space: "ahfy535kiwrz",
            // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
            accessToken: "lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso",
          });
    
          const response = await client.getEntries({ content_type: "leaders", include: 2 });
          setLeadersData(response.items || []);
          console.log(response.items)
        };
        getitems();
      }, []);


   const [startAnimation, setStartAnimation] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setStartAnimation(true);
    } else {
      setStartAnimation(false);
    }
  }, [inView]);

 const scrollRef = useRef(null)
 const trackRef = useRef(null)
 const pausedRef = useRef(false)

  useEffect(() => {
    const container = scrollRef.current
    const track = trackRef.current
    if (!container || !track) return

    const speedPxPerSec = 30
    let lastTs = 0
    let rafId
    let halfWidth = 0
    let x = 0

    const measure = () => {
      // One full set width, since items are duplicated back-to-back
      halfWidth = track.scrollWidth / 2
    }
    measure()

    const step = (ts) => {
      if (!lastTs) lastTs = ts
      const dt = (ts - lastTs) / 1000
      lastTs = ts

      if (!pausedRef.current) {
        x -= speedPxPerSec * dt
        if (halfWidth > 0 && -x >= halfWidth) {
          x += halfWidth
          measure()
        }
        track.style.transform = `translate3d(${x}px, 0, 0)`
      }

      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [leadersData])

  return (
    <div
          className="text-center overflow-x-hidden">
   
      <div
        ref={scrollRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
        onTouchCancel={() => (pausedRef.current = false)}
        className="relative h-[300px] overflow-hidden mx-auto w-[90vw] mt-4"
      >
        <div ref={trackRef} className="flex items-center gap-4 sm:gap-12 will-change-transform">
      {displayData && displayData.map((entry, index) => {
          const fields = entry?.fields || {};
          const name = fields.name || 'Unknown';
          const position = fields.position || '';
          const email = fields.email || '';
          const whatsappRaw = fields.whatsapp || fields.whatsappNo || fields.whatsappNumber || '';
          const whatsappDigits = typeof whatsappRaw === 'string' ? whatsappRaw.replace(/[^\d+]/g, '') : '';
          const whatsappText = whatsappDigits ? encodeURIComponent(`Hello ${name}${position ? ' (' + position + ')' : ''}, I would like to get in touch.`) : '';
          const photoAsset = fields.photo || fields.image || null;
          const rawUrl = photoAsset?.fields?.file?.url || '';
          const imageSrc = rawUrl ? `https:${rawUrl}?w=500&h=500&fit=fill` : '';

          return (
            <div key={index} className=" cursor-pointer block relative py-4 px-4 flex-shrink-0 w-[200px] h-[230px] shadow-lg rounded-lg hover:scale-110 transition duration-200 text-left">
              <div className=" rounded-full block mx-auto p-[2px]">
                <div className="rounded-full bg-blue-400 mx-auto  w-[100px] h-[100px] overflow-hidden relative">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={name}
                      fill
                      className="w-full h-full rounded-full block object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-teal-600">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.87 0-7 3.13-7 7h2a5 5 0 0 1 10 0h2c0-3.87-3.13-7-7-7z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-2 capitalize">{name}</p>
              <p className="opacity-60 text-sm">{position}</p>
              <div className="mt-2 flex items-center gap-3">
                {(
                  <Link
                href={`https://wa.me/${entry.fields.phoneNo}?text=Hello%2C%20I'm%20${name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open WhatsApp chat"
                    title="WhatsApp"
                    className="inline-flex"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-teal-600">
                      <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.08 1.52 5.79L0 24l6.39-1.67A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22a9.9 9.9 0 01-5.05-1.4l-.36-.21-3.78.99 1.01-3.68-.23-.37A9.9 9.9 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.13-6.27c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.27-.73.91-.9 1.1-.17.2-.34.22-.62.08-.28-.14-1.18-.44-2.24-1.41-.83-.74-1.39-1.66-1.56-1.94-.16-.27-.02-.42.12-.56.12-.12.27-.31.41-.46.14-.15.19-.26.28-.43.09-.17.05-.32-.02-.46-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48l-.55-.01c-.19 0-.46.07-.7.32-.24.25-.92.9-.92 2.2s.94 2.55 1.07 2.73c.13.18 1.84 2.82 4.46 3.95.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.08 1.66-.68 1.89-1.33.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z"/>
                    </svg>
                  </Link>
                )}
                {email ? (
                  <Link
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Compose email in Gmail"
                    title={email}
                    className="inline-flex"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-600">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 11 4 6.01V6h16zM4 18V8.24l7.4 4.93c.36.24.83.24 1.2 0L20 8.24V18H4z"/>
                    </svg>
                  </Link>
                ) : null}
            </div>
          </div>
          );
        })}
        </div>

        

        <div className="absolute -bottom-12 left-[50%] -translate-x-1/2 w-[120px] h-1 bg-gradient-to-r from-white via-blue-500 to-white" />
      </div>
      {}
      
    </div>
  );
};

export default OurTeam;
