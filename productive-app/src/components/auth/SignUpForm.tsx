"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { taskApi } from "@/lib/services/api";
import { SignUpInt } from "@/lib/interfaces";
import axios from "axios";

/**COMPONENT */
const SignUpForm: React.FC = () => {
  /**VARIABLES */
  /**Signup variables */
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**Styling */
  const imageContainerStyle = {
    borderTopRightRadius: "60px",
    borderBottomRightRadius: "60px",
    overflow: "hidden",
  };

  /**Yup validation schema for the signup form */
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("First Name is required"),
    lastName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"), // Matching Login logic (min 6)
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  /**FUNCTIONS */
  /**Function to handle signup */
  const handleSignup = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignUpInt) => {
    setError(null);
    setLoading(true);

    try {
      /**Post user to API */
      const response = await taskApi.post("/auth/signup", {
        email,
        password,
        firstName,
        lastName,
      });
      console.log(response);
      /**Throw error if exists */
      if (error) throw error;

      /**Alert user on success */
      if (response.data) {
        console.log(response.data);
        /**Alert success */
        alert(response.data.message);
        
        /** Redirect to login page automatically */
        router.push("/login");
        
        return response.data;
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      /**Check if it is an Axios Error */
      if (axios.isAxiosError(error)) {
        /**check if the response exists (server responded with 4xx or 5xx) */
        if (error.response && error.response.data) {
          /**Capture specific 'error' field or 'message' field from backend */
          errorMessage =
            error.response.data.error ||
            error.response.data.message ||
            error.message;

          /** Log the specific backend data for debugging */
          // console.log("Backend Error Data:", error.response.data);
        } else {
          /**No response received (e.g., Network Error, server down) */
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        /**Standard JS Error */
        errorMessage = error.message;
      }
      setError(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**TEMPLATE */
  return (
    <div className="flex min-h-screen bg-white">
      <div
        className="hidden lg:block lg:w-1/2 relative"
        style={imageContainerStyle}
      >
        <div
          className="h-full bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage: "url('/images/auth.png')",
          }}
          aria-hidden="true"
        ></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white shadow-lg lg:shadow-none">
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-8">
            <span className="text-black">Sign </span>{" "}
            <span className="text-green-500">Up</span>
          </h1>

          {/* SIGNUP FORM with Formik */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log("Signup submitted with:", values);
              /**Sign up with api */
              const data = await handleSignup(values);
              setSubmitting(false);
              /**Reset form after submit if successful session created */
              if (data) {
                resetForm();
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* FIRST NAME */}
                <div className="">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <div
                    className={`rounded-md border ${
                      errors.firstName && touched.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded-md placeholder-gray-400"
                      placeholder="First Name"
                    />
                  </div>
                  {errors.firstName && touched.firstName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* LAST NAME */}
                <div className="">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <div
                    className={`rounded-md border ${
                      errors.lastName && touched.lastName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded-md placeholder-gray-400"
                      placeholder="Last Name"
                    />
                  </div>
                  {errors.lastName && touched.lastName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div
                    className={`rounded-md border ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded-md placeholder-gray-400"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div
                    className={`rounded-md border ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                      placeholder="Password"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div
                    className={`rounded-md border ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                      placeholder="Confirm Password"
                    />
                  </div>
                  {/* Display error if passwords don't match */}
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={!isValid || loading || isSubmitting}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:bg-green-300 disabled:cursor-not-allowed `}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>
            )}
          </Formik>

          {/* ERROR BLOCK */}
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-500 hover:text-green-600 transition duration-150"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;