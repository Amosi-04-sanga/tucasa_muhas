"use client";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { account, databases, storage, ID } from "../../lib/appwrite";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FadeUp } from "..";


// Zod schemas (can remain even in JSX)
const step1Schema = z.object({
  name: z.string().min(1, "Full Name is required"),
  gender: z.string().min(1, "gender is required"),
  adress: z.string().min(1, "adress is required"),
  baptism_status: z.string().min(1, "baptism status is required"),
});

const step2Schema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "password is required"),
  phone: z.string().min(1, "Phone number is required"),
 // otherInfo: z.string().optional(),
});

const step3Schema = z.object({
  course: z.string().min(1, "course is required"),
  year_of_study: z.string().min(1, "year of study is required"),
});



const allStepsSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)

const steps = [
  {
    label: "Personal Info",
    fields: ["Name", "gender", "adress", "baptism_status"],
    schema: step1Schema,
  },
  {
    label: "credentials",
    fields: ["email", "password", "phone"],
    schema: step2Schema,
  },
  {
    label: "University info",
    fields: ["course", "year_of_study"],
    schema: step3Schema,
  },
  
];

export default function MemberForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [registered, setRegistered] = useState(false);

  
 

  const methods = useForm({
    resolver: zodResolver(allStepsSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      gender: "",
      adress: "",
      baptism_status: "",
      email: "",
      password: "",
      phone: "",
      course: "",
      year_of_study: "",
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = methods;

  const onNext = async () => {
    if (step >= steps.length) return;
    const currentStepFields = steps[step].fields;
    const valid = await trigger(currentStepFields );
    if (valid) setStep((s) => s + 1);
  };

  const onBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const onSubmit = async (data) => { 
    setSubmitted(true);
    console.log("registratio info:", data);

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
      setSubmiting(true);
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // const session = await account.createEmailPasswordSession(email, password);

      // Store extra info in your DB
      await databases.createDocument(
        "68668bb2002232c78c64",
        "68668c13002021cd8a17",
        ID.unique(),
        {
          userId: newAccount.$id,
          name,
          email,
          baptism_status,
          course,
          phone,
          gender,
          adress,
          year_of_study,
        }
      );

      setRegistered(true);
      console.log("registered successfully");  
      
      // Automatically log in the user after registration
      try {
        await account.createEmailPasswordSession(email, password);
        console.log("User logged in successfully");
      } catch (loginError) {
        console.error("Auto-login failed:", loginError);
      }
      
      reset();
      
      // Redirect to home page after successful registration (force full reload)
      setTimeout(() => {
        window.location.replace('/');
      }, 500);
    } catch (error) {
      reset();
      setSubmiting(false);
      throw new Error(error.message);
    }



  };

  const progressPercents = [0, 33, 66];

  return (
    <main className="py-10 px-2 text-left">
      <FadeUp>
      <div className="w-full max-w-md mx-auto">
        {!submitted && (
          <div className="mb-4">
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-orange-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercents[step]}%` }}
              ></div>
            </div>
          </div>
        )}

        { (
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl p-6 sm:p-4"
            >
              <div className="mb-6 text-sm text-[#10284A] font-semibold text-left">
                Step {step + 1} of 3: {steps[step].label}
              </div>

              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-medium mb-1">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.name ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Gender<span className="text-red-500">*</span>
                    </label>
                    <select
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.gender ? "border-red-400" : "border-gray-300"
                }`}
                id="gender"
                {...register("gender")}
              >
                <option value="">select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
                   
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Adress<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("adress")}
                      className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.phone ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.adress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.adress.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Baptism status<span className="text-red-500">*</span>
                    </label>

                    <select
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.baptism_status ? "border-red-400" : "border-gray-300"
                }`}
                required
                id="baptism_status"
                {...register("baptism_status")}
              >
                <option value="">select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

                    {errors.baptism_status && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.baptism_status.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-medium mb-1">
                      Email
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.email ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Password
                      <span className="text-red-500">*</span>
                    </label>
                     <input
                type="password"
                required
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
                id="password"
                {...register("password")}
              />
                 
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">
                      Phone number
                    </label>
                    <input
                type="phone"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                 {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}   
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">

<div>
                    <label className="block font-medium mb-1">
                    Course
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="MD, BMLS"
                      {...register("course")}
                      className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.course ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.course && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.course.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">
                    Year of study
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="2025/2026"
                      {...register("year_of_study")}
                      className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.year_of_study ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.year_of_study && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.year_of_study.message}
                      </p>
                    )}
                  </div>
                
                 
                </div>
              )}

              {/* Success message */}
              {registered && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                  <p className="font-medium">Registered successfully! Redirecting to home page...</p>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-200"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-4 py-2 rounded-lg bg-primary-dark text-white font-semibold hover:bg-[#10284A] transition duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submiting}
                    className="px-4 py-2 rounded-lg bg-primary-dark text-white font-semibold cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submiting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        )}
      </div>
      </FadeUp>
    </main>
  );
}


/*
const response = await storage.createFile(
        "6866981d001e9d0b62dd", // e.g., "profile_pics"
        ID.unique(), // Auto-generate file ID
        file // File object from <input type="file">
      );
      console.log("File uploaded:", response);

*/
/*
const { register, handleSubmit, reset } = useForm();
  

  const onSubmit = async (data) => {
   
  };
*/