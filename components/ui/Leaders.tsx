"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { createClient } from "contentful";
import Link from "next/link"; // make sure you import this

const Leaders = () => {
  const [leadersData, setLeadersData] = useState<any[]>([]);
  const [startAnimation, setStartAnimation] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    const getItems = async () => {
      const client = createClient({
        space: "ahfy535kiwrz",
        accessToken: "lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso",
      });

      const response = await client.getEntries({ content_type: "leaders" });
      setLeadersData(response.items);
      console.log("Leaders data:", response.items);
    };
    getItems();
  }, []);

  useEffect(() => {
    if (inView) {
      setStartAnimation(true);
    } else {
      setStartAnimation(false);
    }
  }, [inView]);

  const scrollRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
  
    let direction = 1;           // 1 → right, -1 → left
    const speed = 0.2;           // px per frame; tweak to taste
    let hovered = false;
    let rafId = 0;
  
    const tick = () => {
      if (!hovered) {
        // bounce at edges
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          direction = -1;
        } else if (el.scrollLeft <= 0) {
          direction = 1;
        }
        el.scrollLeft += speed * direction;
      }
      rafId = requestAnimationFrame(tick);
    };
  
    // pause/resume on hover
    const onEnter = () => { hovered = true; };
    const onLeave = () => { hovered = false; };
  
    // allow natural manual scroll:
    //  - vertical wheel → horizontal scroll in the strip
    //  - prevent page from scrolling while interacting with the strip
    const onWheel = (e: any) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
  
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("wheel", onWheel, { passive: false });
  
    rafId = requestAnimationFrame(tick);
  
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("wheel", onWheel);
    };
  }, [scrollRef.current]);
  
  

  return (
    <div className="text-center">
     <div
  className="relative mx-auto min-h-[350px] w-[85vw] mt-4 flex items-center gap-4 sm:gap-12 overflow-x-scroll hide-scrollbar"
>
        {leadersData.map((person, index) => {
          const { name, position, email, phoneNo, photo } = person.fields;
          const imageUrl = photo?.fields?.file?.url;

          return (
            <div
              key={index}
              className="cursor-pointer block relative py-4 px-4 flex-shrink-0 w-[200px] min-h-[250px] shadow-lg rounded-lg hover:scale-110 transition duration-200 text-left"
            >
              <div className="rounded-full block mx-auto p-[2px]">
                <div className="rounded-full bg-blue-400 mx-auto w-[100px] h-[100px] overflow-hidden relative">
                  {imageUrl ? (
                    <Image
                      src={`https:${imageUrl}?w=300&h=300&fit=fill`}
                      alt={name}
                      fill
                      className="w-full h-full rounded-full block object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 text-teal-600"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.87 0-7 3.13-7 7h2a5 5 0 0 1 10 0h2c0-3.87-3.13-7-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-2 uppercase text-sm">{name}</p>
              <p className="opacity-60 text-[10px] uppercase">{position}</p>
              <div className="mt-2 flex items-center gap-3">
                {phoneNo && (
                  <Link
                    href={`https://wa.me/${phoneNo}?text=Hello%2C%20${name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open WhatsApp chat"
                    className="inline-flex"
                  >
                   <Image
                    src='/assets/icons/whatsaap.svg'
                    alt="whatsaap"
                    width={30}
                    height={30}
                   />
                  </Link>
                )}
                {email && (
                  <Link
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Hello&body=I%20want%20to%20contact%20you.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Send Email"
                    className="inline-flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 text-teal-600"
                    >
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 11 4 6.01V6h16zM4 18V8.24l7.4 4.93c.36.24.83.24 1.2 0L20 8.24V18H4z" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default Leaders;
