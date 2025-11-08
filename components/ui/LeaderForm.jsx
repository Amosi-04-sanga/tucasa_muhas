"use client";
import React, { useState } from "react";
import { account, databases, ID } from "../../lib/appwrite";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FadeUp } from "..";

// ✅ Zod schemas
const step1Schema = z.object({
  name: z.string().min(1, "Full Name is required"),
  gender: z.string().min(1, "Gender is required"),
  adress: z.string().min(1, "Address is required"),
  baptism_status: z.string().min(1, "Baptism status is required"),
});

const step2Schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  phone: z.string().min(1, "Phone number is required"),
});

const step3Schema = z.object({
  course: z.string().min(1, "Course is required"),
  position: z.string().min(1, "Position is required"),
  year_of_study: z.string().min(1, "Year of study is required"),
});

// ✅ Merge schemas
const allStepsSchema = step1Schema.merge(step2Schema).merge(step3Schema);

// ✅ Steps config (match schema keys exactly!)
const steps = [
  {
    label: "Personal Info",
    fields: ["name", "gender", "adress", "baptism_status"],
    schema: step1Schema,
  },
  {
    label: "Credentials",
    fields: ["email", "password", "phone"],
    schema: step2Schema,
  },
  {
    label: "Leadership Info",
    fields: ["course", "year_of_study", "position"],
    schema: step3Schema,
  },
];

export default function LeaderForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, seterror] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      position: "",
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
    const valid = await trigger(currentStepFields); // ✅ Correct field names
    if (valid) {
      seterror(false); // Clear error when moving to next step
      setErrorMessage(""); // Clear error message
      setStep((s) => s + 1);
    }
  };

  const onBack = () => {
    if (step > 0) {
      seterror(false); // Clear error when going back
      setErrorMessage(""); // Clear error message
      setStep((s) => s - 1);
    }
  };

  const onSubmit = async (data) => {
    setSubmitted(true);
    seterror(false);
    setErrorMessage("");
    console.log("Registration info:", data);

    const {
      name,
      gender,
      adress,
      baptism_status,
      email,
      password,
      phone,
      course,
      year_of_study,
      position,
    } = data;

    try {
      setSubmiting(true);
      console.log("Starting registration process...");

      // ✅ Create account in Appwrite Auth
      console.log("Creating account...");
      let newAccount;
      try {
        newAccount = await account.create(
          ID.unique(),
          email,
          password,
          name
        );
        console.log("Account created successfully:", newAccount.$id);
      } catch (accountError) {
        console.error("Account creation error:", accountError);
        throw new Error(
          accountError.message || "Failed to create account. Email may already exist."
        );
      }

      // ✅ Store extra info in Appwrite Database
      console.log("Creating document in database...");
      try {
        const documentData = {
          userId: newAccount.$id,
          status: "leader",
          name,
          gender,
          adress,
          baptism_status,
          email,
          phone,
          course,
          year_of_study,
          position,
        };
        console.log("Document data:", documentData);
        
        const document = await databases.createDocument(
          "68668bb2002232c78c64", // databaseId
          "68668c13002021cd8a17", // collectionId
          ID.unique(),
          documentData
        );
        console.log("Document created successfully:", document.$id);
      } catch (dbError) {
        console.error("Database creation error:", dbError);
        // Log the error - account was created but document wasn't
        // User may need to contact support or use a different email
        throw new Error(
          dbError.message || "Account created but failed to save profile data. Please contact support."
        );
      }

      setRegistered(true);
      console.log("Registered successfully");

      // ✅ Auto-login user
      try {
        await account.createEmailPasswordSession(email, password);
        console.log("User logged in successfully");
      } catch (loginError) {
        console.error("Auto-login failed:", loginError);
        // Don't set error for login failure if registration succeeded
        // User can manually login later
      }

      reset();

      // ✅ Redirect
      setTimeout(() => {
        window.location.replace("/");
      }, 800);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg =
        error.message ||
        "Registration failed. Please check your information and try again.";
      seterror(true);
      setErrorMessage(errorMsg);
      setSubmiting(false);
      setSubmitted(false);
      setRegistered(false);
    }
  };

  const progressPercents = [33, 66, 100];

  return (
    <main className="py-4 px-2 text-left">
      <FadeUp>
        <div className="w-full max-w-md mx-auto">
          {!submitted && (
            <div className="mb-1">
              <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-orange-300 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercents[step]}%` }}
                ></div>
              </div>
            </div>
          )}

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl p-6 sm:p-4"
            >
              <div className="mb-6 text-sm text-[#10284A] font-semibold text-left">
                Step {step + 1} of 3: {steps[step].label}
              </div>

              {/* Step 1 */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-medium mb-1">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-full rounded-lg border px-3 py-2 ${
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
                    <label className="block font-medium mb-1">Gender</label>
                    <select
                      {...register("gender")}
                      className={`w-full rounded-lg border px-3 py-2 ${
                        errors.gender ? "border-red-400" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select</option>
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
                    <label className="block font-medium mb-1">Address</label>
                    <input
                      type="text"
                      placeholder="eg: DSM"
                      {...register("adress")}
                      className={`w-full rounded-lg border px-3 py-2 ${
                        errors.adress ? "border-red-400" : "border-gray-300"
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

              {/* Step 2 */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full rounded-lg border px-3 py-2 ${
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
                    <label className="block font-medium mb-1">Password</label>
                    <input
                      type="password"
                      {...register("password")}
                      className={`w-full rounded-lg border px-3 py-2 ${
                        errors.password ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+255712345678"
                      {...register("phone")}
                      className={`w-full rounded-lg border px-3 py-2 ${
                        errors.phone ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-medium mb-1">Course</label>
                    <input
                      type="text"
                      {...register("course")}
                      placeholder="eg: MD, BMLS"
                      className={`w-full rounded-lg border px-3 py-2 ${
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
                      Leader Position
                    </label>
                    <input
                      type="text"
                      {...register("position")}
                      placeholder="eg: chairman of TM"
                      className={`w-full rounded-lg border px-3 py-2 ${
                        errors.position ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.position && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.position.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Year of Study
                    </label>
                    <input
                      type="text"
                      placeholder="eg: 3"
                      {...register("year_of_study")}
                      className={`w-full rounded-lg border px-3 py-2 ${
                        errors.year_of_study
                          ? "border-red-400"
                          : "border-gray-300"
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
                  <p className="font-medium">
                    Registered successfully! Redirecting to home page...
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="text-sm font-medium">
                    {errorMessage || "Registration failed. Please check your information and try again."}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between mt-8">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
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
                    disabled={submiting}
                    className="px-4 py-2 rounded-lg bg-primary-dark text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submiting || registered}
                    className="px-4 py-2 rounded-lg bg-primary-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submiting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </FadeUp>
    </main>
  );
}

