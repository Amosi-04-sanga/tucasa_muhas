"use client";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const Form = () => {
  const [messageSend, setMessageSend] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data, e) => {
    emailjs
      .sendForm("service_4kdyr3m", "template_0m28fhq", e.target, {
        publicKey: "MrKtDiM4rOW05oIyz",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          reset();
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div className="mt-0 pb-1 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <h1 className="text-center text-primary-dark pt-16 font-bold text-3xl">Contact us</h1>

      <div className="max-w-[350px] mt-4 mb-16 mx-auto">
        <p className="mt-4">Send us a message</p>
        <Fade>
          <form
            className="flex flex-col gap-4 mt-4 bg-white  w-full rounded-md px-4 py-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="name"
                {...register("Name")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="email"
                {...register("Email")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message">Message <span className="text-red-500">*</span></label>
              <textarea
                type="textarea"
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="message"
                {...register("Message")}
              />
            </div>

            <button
              type="submit"
              className="bg-white mx-auto block px-4 py-1 rounded-md capitalize mt-4 cursor-pointer border-primary-light border-[1px]"
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

/*  <p className="italic text-gray-700">
              Thanks, message send successfully!
            </p>*/
