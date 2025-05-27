"use client";
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";

const page = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="max-w-[350px] mt-42 mx-auto ">
        <Fade>
          <form
            className="flex flex-col gap-4 mt-4 w-full bg-primary-dark rounded-md px-4 py-8 text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="email"
                {...register("Email")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="password"
                {...register("password")}
              />
            </div>

            <button
              type="submit"
              className=" mx-auto block px-4 py-1 rounded-md text-white capitalize mt-4 cursor-pointer border-primary-light border-[1px]"
            >
              sign in
            </button>
          </form>
        </Fade>
        <div className="flex gap-2 justify-center items-center mb-8 mt-4">
          <p>New user ?</p>
          <Link href="/register" className="text-red-800 font-bold">
            {" "}
            register{" "}
          </Link>
        </div>

      </div>
    </>
  );
};

export default page;
