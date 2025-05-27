"use client";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabaseClient";

const LeaderForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData) => {
    try {
      const {
        email,
        name,
        phone,
        leadership_position,
        duration_of_leadership,
        gender,
        course,
      } = formData;
      /* const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });  */

      if (true) {
        console.log("new user");

        const { error: insertError, data: insertData } = await supabase
          .from("members")
          .insert([
            {
              email,
              name,
              phone,
              gender,
              course,
              leadership_position,
              duration_of_leadership,
            },
          ]);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      // reset();
    }
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
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                required
                id="gender"
                {...register("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                type="phone"
                required
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

            <div className="flex flex-col gap-1">
              <label htmlFor="course">Course</label>
              <select
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                required
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

            <div className="flex flex-col gap-1">
              <label htmlFor="position">Leadership position</label>
              <select
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                required
                id="position"
                {...register("leadership_position")}
              >
                <option value="charman of tucasa">Charman of tucasa</option>
                <option value="secretary of tucasa">Secretary of tucasa</option>
                <option value="treasure of tucasa">Treasure of tucasa</option>
                <option value="ICT chairman">ICT chairman</option>
                <option value="ICT secretary">ICT secretary</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="duration_of_leadership">
                Duration of leadership
              </label>
              <input
                type="text"
                required
                className="rounded-md bg-white px-2 py-1 text-black outline-none"
                id="duration_of_leadership"
                placeholder="2025-2026"
                {...register("duration_of_leadership")}
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

export default LeaderForm;

/*    if (data.user.id) {
        // Add user to the "members" table
        const { error: insertError } = await supabase.from("members").insert([
          {
            email,
            name,
            phone,
          },
        ]);
      } */
