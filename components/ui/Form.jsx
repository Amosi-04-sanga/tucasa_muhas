"use client";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";

const Form = () => {
  const [messageSend, setMessageSend] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="mt-16 pb-1 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40">
      <h1 className="text-center pt-16 font-bold text-3xl">Contact us</h1>

      <div className="max-w-[350px] mt-4 mb-32 mx-auto">
        <p className="mt-4">Send us a message</p>
        <Fade>
          <form
            className="flex flex-col gap-4 mt-4  w-full bg-primary-dark rounded-md px-4 py-8 text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="rounded-md px-2 py-1 bg-white text-black outline-none"
                id="name"
                {...register("Name")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="email"
                {...register("Email")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message">Message</label>
              <textarea
                type="textarea"
                rows={2}
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="message"
                {...register("Message")}
              />
            </div>

            <p className="italic text-gray-700">
              Thanks, message send successfully!
            </p>

            <button
              type="submit"
              className=" mx-auto block px-4 py-1 rounded-md text-white capitalize mt-4 cursor-pointer border-primary-light border-[1px]"
            >
              Send
            </button>
          </form>
        </Fade>
      </div>
    </div>
  );
};

export default Form;
