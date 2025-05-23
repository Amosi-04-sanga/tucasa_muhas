"use client";
import { nav_links } from "@/constants";
import { images } from "@/src/images";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";

const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSubmenuOpened, setIsSubmenuOpened] = useState(false);

  const { menu, location, right_arrow, hope_in_ict } = images;

  return (
    <>
      <div className="sticky left-0 top-0 z-50 flex justify-between items-center px-8 h-[10vh] bg-primary-dark text-white">
        <div>
          <Image
            src={hope_in_ict}
            alt={`logo`}
            width={90}
            height={70}
            className="block mx-auto"
          />
        </div>
        <div>
          <Image
            src={isMenuOpened ? location : menu}
            alt="menu"
            width={35}
            height={35}
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            className="cursor-pointer"
          />
        </div>
      </div>

      {isMenuOpened && (
        <div className="fixed left-0 top-[10vh] min-h-screen z-50 px-8 w-[350px] bg-primary-dark">
          <div className="mt-24 pb-8 text-white flex flex-col gap-4">
            {nav_links.map((item, index) => (
              <Slide key={item.link_text} delay={index * 100}>
                <div className="flex gap-4">
                  <Link
                    className="inline-block hover:font-bold"
                    href={item.path}
                  >
                    <div
                      onClick={() => setIsSubmenuOpened(!isSubmenuOpened)}
                      className="flex gap-2"
                    >
                      <p>{item.link_text}</p>
                      {item.register_as && (
                        <Image
                          src={right_arrow}
                          alt="icon"
                          width={15}
                          height={20}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </Link>
                  {isSubmenuOpened && item.register_as && (
                    <div className="flex flex-col gap-4">
                      {item.register_as.map((item) => (
                        <Link href={item.path} key={item.link_text}>
                          {item.link_text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </Slide>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

/*

*/
