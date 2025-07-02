"use client";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { account, databases, ID } from "../../lib/appwrite";
import { Permission, Role } from 'appwrite';

const MemberForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const {
      name,
      email,
      password,
      baptism_status,
      adress,
      course,
      gender,
      phone,
      year_of_study,
    } = data;

    try {
     const newAccount = await account.create(ID.unique(), email, password, name);

      // Store extra info in your DB
      await databases.createDocument(
        "68656655000caca35665",
        "686566a6001a34b76c14",
        ID.unique(),
        {
          userId: newAccount.$id,
          name,
          email,
          baptism_status,
          course,
          phone,
          adress,
          year_of_study
        },
        [
          Permission.read(Role.user(newAccount.$id)),
          Permission.update(Role.user(newAccount.$id)),
          Permission.delete(Role.user(newAccount.$id))
        ]
      );

      console.log("registered successfully");
      console.log(data);
      reset();
    } catch (error) {
      throw new Error(error.message);
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
                {...register("baptism_status")}
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
