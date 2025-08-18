"use client";
import { images } from "@/src/images";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";


const SLIDES = [
  {
    type: "image",
    src: "/assets/hero/photos/hero3.jpg",
    alt: "Tucasa muhas", 
    text: 'We are in one family of GOD'
  },
  {
    type: "video",
    src: '/assets/hero/videos/tucasa.mp4',
    alt: "Tucasa Muhas Choir",
    text: 'Be blessed with songs from Tucasa muhas Choir',
  },
  {
    type: "image",
    src: "/assets/hero/photos/hero4.jpg",
    alt: "Tucasa Muhas Projects",
    text: 'Discover Peace in Every Journey'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textAnimActive, setTextAnimActive] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prevIndexRef = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleVideoEnded = () => {
    nextSlide();
  };

  const playCurrentVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    if (document.visibilityState !== "visible") return;
    el.muted = true;
    const p = el.play();
    if (p && typeof (p as any).catch === "function") {
      (p as Promise<void>).catch(() => {});
    }
  };

  // Restart video when video slide becomes active
  useEffect(() => {
    const currentSlideData = SLIDES[currentSlide];
    if (currentSlideData && currentSlideData.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      playCurrentVideo();
    }
  }, [currentSlide]);

  // Try to resume video when tab becomes visible or window gains focus
  useEffect(() => {
    const onVis = () => playCurrentVideo();
    const onFocus = () => playCurrentVideo();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Animate text zoom/fade synced with slide change
  useEffect(() => {
    // reset to initial state briefly, then activate to trigger transition
    setTextAnimActive(false);
    const id = setTimeout(() => setTextAnimActive(true), 20);
    return () => clearTimeout(id);
  }, [currentSlide]);

  // Derive slide direction from index changes
  useEffect(() => {
    const prev = prevIndexRef.current;
    const diff = (currentSlide - prev + SLIDES.length) % SLIDES.length;
    // If moved forward (including wrap), mark as next; otherwise prev
    setSlideDirection(diff === 1 || (prev === SLIDES.length - 1 && currentSlide === 0) ? "next" : "prev");
    prevIndexRef.current = currentSlide;
  }, [currentSlide]);

  // Handle slideshow timing
  useEffect(() => {
    const currentSlideData = SLIDES[currentSlide];
    
    if (currentSlideData) {
      if (currentSlideData.type === "image") {
        // For images, set 5-second timer
        intervalRef.current = setTimeout(() => {
          nextSlide();
        }, 5000);
      } else if (currentSlideData.type === "video") {
        // For video, clear any existing timer and let video end event handle it
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [currentSlide]);


  const handleBook = () => {
    const el = document.querySelector("#booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Slideshow background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all ease-in-out ${
              index === currentSlide
                ? "translate-x-0 opacity-100"
                : index < currentSlide
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
            }`}
            style={{ transitionDuration: "3000ms" }}
          >
            <div
              className={`absolute inset-0 transform transition-transform duration-[3000ms] ease-in-out will-change-transform ${
                index === currentSlide
                  ? textAnimActive
                    ? "scale-110"
                    : "scale-100"
                  : "scale-100"
              }`}
            >
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={slide.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  preload="auto"
                  muted
                  onEnded={handleVideoEnded}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
        <h1
          className={`text-4xl max-sm:max-w-[300px] max-w-[500px] md:text-5xl font-bold text-white text-center drop-shadow-lg transform transition-all duration-[3000ms] ease-in-out origin-center will-change-transform min-h-[3.5rem] ${
            textAnimActive
              ? "opacity-100 scale-100 translate-x-0"
              : slideDirection === "next"
                ? "opacity-0 scale-90 translate-x-10"
                : "opacity-0 scale-90 -translate-x-10"
          }`}
        >
          {SLIDES[currentSlide]?.text || "Tucasa Muhas Family"}
        </h1>
        {SLIDES[currentSlide]?.type === "video" && (
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our YouTube channel"
            className="mt-6 inline-flex items-center justify-center w-12 h-12 rounded-full hover:scale-110 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-12 h-12"
            >
              <path fill="#FF0000" d="M23.5 6.2a3.3 3.3 0 0 0-2.3-2.3C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.2.4A3.3 3.3 0 0 0 .5 6.2 34.5 34.5 0 0 0 0 12c0 1.9.2 3.9.5 5.8.3 1.1 1.2 2 2.3 2.3 1.7.4 9.2.4 9.2.4s7.5 0 9.2-.4a3.3 3.3 0 0 0 2.3-2.3c.3-1.9.5-3.9.5-5.8 0-1.9-.2-3.9-.5-5.8Z"/>
              <path fill="#FFF" d="M9.75 8.5v7l6-3.5-6-3.5Z"/>
            </svg>
          </Link>
        )}
      </div>

      {/* Prev / Next controls */}
      <button
        aria-label="Previous slide"
        onClick={prevSlide}
        className="cursor-pointer absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-primary-dark/70 hover:bg-primary-dark text-white rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={nextSlide}
        className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-primary-dark/70 hover:bg-primary-dark text-white rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
      </button>
    </section>
  );
} 

/*
  <section
       
        className="relative min-h-[90vh] flex items-center justify-center"
      >
        <div className="bg-[#222] absolute left-0 top-0 z-10 h-[90vh] w-full opacity-[.6]" />

        <div className={`absolute inset-0 min-h-[80vh] w-100vw `}>
         {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-b-transparent border-yellow-700" />
        </div>
      )}
         <Image
          src={hero_slideshow[currentIndex].url}
          alt="Hero Background"
          fill
          priority
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
           
          }}
          onLoad={ () => setIsLoading(false)}
        />
       </div>

        <div className="flex flex-col justify-center items-center absolute left-[50%] -translate-x-2/4 top-[60%] -translate-y-2/4 z-20 h-[90vh] max-sm:w-auto text-center text-white">
          <Fade className="sm:w-[450px] max-sm:w-[280px]">
            <h1 className="text-md md:text-2xl text-yellow-200 uppercase">
              {" "}
              {hero_slideshow[currentIndex].title}{" "}
            </h1>
            <div className="mt-4 text-4xl md:text-6xl ">
              {" "}
              <span>{hero_slideshow[currentIndex].description}</span>{" "}
              {currentIndex === 2 && (
                <span className="text-yellow-200 block text-[22px] italic">
                  Hebrews 13:1
                </span>
              )}
            </div>
          </Fade>
          <Slide direction="up">
            {hero_slideshow[currentIndex].btn && (
              <Link href="#about">
                <button
                  className={`p-4 rounded-md text-white capitalize mt-24 cursor-pointer border-gray-500 border-[1px]`}
                >
                  <div className="flex gap-2">
                    <Image
                      src={right_arrow}
                      alt="icon"
                      width={20}
                      height={20}
                      className="rotate-90"
                    />
                  </div>
                </button>
              </Link>
            )}
          </Slide>
        </div>
        <button
          onClick={toLeftHandler}
          className="absolute z-20 left-4 top-[50%] border-white border-1 rounded-full p-2 translate-y-2/4 cursor-pointer text-white font-bold uppercase"
        >
          <Image
            src={right_arrow}
            alt="icon"
            width={20}
            height={20}
            className="rotate-180"
          />
        </button>
        <button
          onClick={toRightHandler}
          className="absolute z-20 right-4 top-[50%] border-white border-1 rounded-full p-2 translate-y-2/4 cursor-pointer text-white font-bold uppercase"
        >
          <Image
            src={right_arrow}
            alt="icon"
            width={20}
            height={20}
            className=""
          />
        </button>
      </section>
*/