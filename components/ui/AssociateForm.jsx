"use client";
import React, { useState } from "react";
import { account, databases, ID } from "../../lib/appwrite";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FadeUp } from "..";


// Zod schemas
const step1Schema = z.object({
  name: z.string().min(1, "Full Name is required"),
  gender: z.string().min(1, "Gender is required"),
  adress: z.string().min(1, "Address is required"),
});

const step2Schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  phone: z.string().min(1, "Phone number is required"),
});

const step3Schema = z.object({
  profession: z.string().min(1, "Profession is required"),
  year_of_graduation: z.string().min(1, "Year of graduation is required"),
});





const allStepsSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)

const steps = [
  {
    label: "Personal Info",
    fields: ["name", "gender", "adress"],
    schema: step1Schema,
  },
  {
    label: "Credentials",
    fields: ["email", "password", "phone"],
    schema: step2Schema,
  },
  {
    label: "Other Info",
    fields: ["profession", "year_of_graduation"],
    schema: step3Schema,
  },
];

export default function AssociateForm() {
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
      email: "",
      password: "",
      phone: "",
      profession: "",
      year_of_graduation: "",
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
    const valid = await trigger(currentStepFields);
    if (valid) {
      seterror(false);
      setErrorMessage("");
      setStep((s) => s + 1);
    }
  };

  const onBack = () => {
    if (step > 0) {
      seterror(false);
      setErrorMessage("");
      setStep((s) => s - 1);
    }
  };

  const onSubmit = async (data) => {
    // Reset error states
    seterror(false);
    setErrorMessage("");
    setSubmitted(true);
    
    console.log("Registration info:", data);
    console.log("Form validation passed, proceeding with submission...");

    // Validate all required fields are present
    const {
      name,
      gender,
      adress,
      email,
      password,
      phone,
      profession,
      year_of_graduation,
    } = data;

    // Additional validation
    if (!name || !email || !password || !phone) {
      const errorMsg = "Please fill in all required fields.";
      seterror(true);
      setErrorMessage(errorMsg);
      setSubmitted(false);
      return;
    }

    try {
      setSubmiting(true);
      console.log("Starting registration process...");
      console.log("Data to be sent:", {
        name,
        gender,
        adress,
        email,
        phone,
        profession,
        year_of_graduation,
      });

      // Create account in Appwrite Auth
      console.log("Creating account with email:", email);
      let newAccount;
      try {
        newAccount = await account.create(
          ID.unique(),
          email.trim(),
          password,
          name.trim()
        );
        console.log("Account created successfully:", newAccount.$id);
      } catch (accountError) {
        console.error("Account creation error:", accountError);
        console.error("Error type:", typeof accountError);
        console.error("Error keys:", Object.keys(accountError || {}));
        
        // Handle Appwrite error object structure
        let errorMsg = "Failed to create account. ";
        
        if (accountError?.message) {
          errorMsg += accountError.message;
        } else if (accountError?.response?.message) {
          errorMsg += accountError.response.message;
        } else if (typeof accountError === "string") {
          errorMsg += accountError;
        } else if (accountError?.toString) {
          errorMsg += accountError.toString();
        } else {
          errorMsg += "Email may already exist or invalid credentials.";
        }
        
        console.error("Final error message:", errorMsg);
        throw new Error(errorMsg);
      }

      // Store extra info in Appwrite Database (DO NOT store password)
      console.log("Creating document in database...");
      try {
        const documentData = {
          userId: newAccount.$id,
          status: "associate",
          name: name.trim(),
          gender: gender?.trim() || "",
          adress: adress?.trim() || "",
          email: email.trim(),
          phone: phone?.trim() || "",
          profession: profession?.trim() || "",
          year_of_graduation: year_of_graduation?.trim() || "",
        };
        console.log("Document data to be sent:", documentData);
        
        const document = await databases.createDocument(
          "68668bb2002232c78c64", // databaseId
          "68668c13002021cd8a17", // collectionId
          ID.unique(),
          documentData
        );
        console.log("Document created successfully:", document.$id);
        console.log("Full document:", document);
      } catch (dbError) {
        console.error("Database creation error:", dbError);
        console.error("Error type:", typeof dbError);
        console.error("Error keys:", Object.keys(dbError || {}));
        
        // Handle Appwrite error object structure
        let errorMsg = "Account created but failed to save profile data. ";
        
        if (dbError?.message) {
          errorMsg += dbError.message;
        } else if (dbError?.response?.message) {
          errorMsg += dbError.response.message;
        } else if (typeof dbError === "string") {
          errorMsg += dbError;
        } else if (dbError?.toString) {
          errorMsg += dbError.toString();
        } else {
          errorMsg += "Please contact support.";
        }
        
        console.error("Final error message:", errorMsg);
        throw new Error(errorMsg);
      }

      setRegistered(true);
      console.log("Registered successfully");

      // Auto-login user
      try {
        await account.createEmailPasswordSession(email, password);
        console.log("User logged in successfully");
      } catch (loginError) {
        console.error("Auto-login failed:", loginError);
        // Don't set error for login failure if registration succeeded
      }

      reset();

      // Redirect
      setTimeout(() => {
        window.location.replace("/");
      }, 800);
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Error type:", typeof error);
      console.error("Error object:", error);
      
      // Handle different error object structures
      let errorMsg = "Registration failed. Please check your information and try again.";
      
      if (error instanceof Error) {
        errorMsg = error.message;
      } else if (typeof error === "string") {
        errorMsg = error;
      } else if (error?.message) {
        errorMsg = error.message;
      } else if (error?.response?.message) {
        errorMsg = error.response.message;
      } else if (error?.toString) {
        errorMsg = error.toString();
      }
      
      seterror(true);
      setErrorMessage(errorMsg);
      setSubmiting(false);
      setSubmitted(false);
      setRegistered(false);
    }
  };

  const progressPercents = [0, 33, 66];

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
                      placeholder="eg: DSM"
                      {...register("adress")}
                      className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.adress ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.adress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.adress.message}
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
                  errors.password ? "border-red-400" : "border-gray-300"
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
                    Profession
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="MD, Pharmacist"
                      {...register("profession")}
                      className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.profession ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.profession && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.profession.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">
                    Year of graduation
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="2025"
                      {...register("year_of_graduation")}
                      className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.year_of_graduation ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.year_of_graduation && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.year_of_graduation.message}
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
                  <button
                    type="button"
                    onClick={() => {
                      seterror(false);
                      setErrorMessage("");
                      setSubmitted(false);
                    }}
                    className="mt-2 text-sm underline hover:no-underline"
                  >
                    Try again
                  </button>
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
                    disabled={submiting}
                    className="px-4 py-2 rounded-lg bg-primary-dark text-white font-semibold hover:bg-[#10284A] transition duration-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submiting || (registered && !error)}
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