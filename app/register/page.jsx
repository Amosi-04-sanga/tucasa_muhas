"use client";
import React, { useState } from "react";
import { AssociateForm, LeaderForm, MemberForm } from "../../components";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import Link from "next/link";

const page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const userStatus = ["Member", "Leader", "Associate | Alumni"];
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48">
      <h1 className="mt-8 font-bold text-3xl text-center">Register As</h1>

      <div className="mt-4 flex gap-4  justify-center items-center">
        {userStatus.map((status, index) => (
          <div key={index}>
            <button
              onClick={() => setCurrentIndex(index)}
              className={`block px-2 py-1 rounded-md text-primary-dark capitalize mt-8 cursor-pointer border-primary-light border-[1px] ${
                index === currentIndex && "bg-primary-dark text-white"
              }`}
            >
              {status}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        {currentIndex === 0 && <MemberForm />}
        {currentIndex === 1 && <LeaderForm />}
        {currentIndex === 2 && <AssociateForm />}
      </div>
      <div className="flex gap-2 justify-center items-center mb-8 mt-4">
        <p>Already registered ?</p>
        <Link href="/sign-in" className="text-red-800 font-bold">
          {" "}
          sign in{" "}
        </Link>
      </div>
    </div>
  );
};

export default page;
