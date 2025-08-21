"use client";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { FadeUp, Leaders } from "..";

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
    <div className="mt-0 pb-1 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 ">
      <h1 className="text-center text-primary-dark pt-16 font-bold text-3xl">Contact us</h1>

      <div className="mt-4 mx-auto">
        <p className="mt-4">Meet the current leaders of TUCASA MUHAS, committed to guiding and serving the fellowship. You can easily reach them through WhatsApp or email for any inquiries, support, or fellowship matters.</p>
        
        <FadeUp>
          <div>
          <Leaders/>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

export default Form;

/*  <p className="italic text-gray-700">
              Thanks, message send successfully!
            </p>*/
