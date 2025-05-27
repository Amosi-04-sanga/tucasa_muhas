"use client";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";

const MemberForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
    reset();
  };

  return (
    <>
      <div className="max-w-[350px] mt-4 mx-auto">
        <Fade>
          <form
            className="flex flex-col gap-4 mt-4 w-full bg-primary-dark rounded-md px-4 py-8 text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                required
                className="rounded-md px-2 py-1 bg-white text-black outline-none"
                id="name"
                {...register("name")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="gender">Gender</label>
              <select
                required
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="gender"
                {...register("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="adress">Adress</label>
              <input
                type="text"
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                placeholder="e.g. Dar es Salaam, Shinyanga"
                id="adress"
                {...register("adress")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="course">Course</label>
              <input
                type="text"
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                placeholder="e.g. MD, DDS, BMLS"
                id="course"
                {...register("course")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="year_of_study">Current year of study</label>
              <input
                type="text"
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                placeholder="e.g. 1,2"
                id="year_of_study"
                {...register("year_of_study")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Baptism_status">Baptism status</label>
              <select
                required
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="Baptism_status"
                {...register("Baptism_status")}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="email"
                {...register("email")}
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

            <div className="flex flex-col gap-1">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[0-9\s\-]{7,16}$/,
                    message: "Only numbers, spaces, +, and - are allowed",
                  },
                })}
                placeholder="+255712345678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Profile picture
              </label>
              <input
                type="file"
                {...register("file", { required: true })}
                className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-gray-500 hover:file:bg-blue-100"
              />
            </div>

            <button
              type="submit"
              className=" mx-auto block px-4 py-1 rounded-md text-white capitalize mt-4 cursor-pointer border-primary-light border-[1px]"
            >
              Sign up
            </button>
          </form>
        </Fade>
      </div>
    </>
  );
};

export default MemberForm;

/*
 <div className="flex flex-col gap-1">
              <label htmlFor="course">Course</label>
              <select
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="course"
                {...register("course")}
              >
                <option value="MD">MD</option>
                <option value="DDS">DDS</option>
                <option value="BMLS">BMLS</option>
                <option value="PHARMACY">PHARMACY</option>
                <option value="RADIOLOGY">RADIOLOGY</option>
                <option value="NURSING">NURSING</option>
                <option value="PHYSIOTHERAPY">PHYSIOTHERAPY</option>
                <option value="ENVIRONMENTAL HEALTH">
                  ENVIRONMENTAL HEALTH
                </option>
                <option value="OT">OT</option>
              </select>
            </div>
*/
