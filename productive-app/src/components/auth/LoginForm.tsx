"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

/**COMPONENT */
const LogInForm: React.FC = () => {
  /**VARIABLES */
  /**Login variables */
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  /**Styling */
  const imageContainerStyle = {
    borderTopRightRadius: "60px",
    borderBottomRightRadius: "60px",
    overflow: "hidden",
  };
  /**Yup validation schema for the login form */
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  /**FUNCTIONS */
  /**Function to handle login */
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    /**Import supabase client */
    const supabase = createClient();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      /**Throw error if exists */
      if (error) throw error;

      /**Return data if session exists */
      if (data.session) {
        /**navigate to app */
        router.push("/tasks");
        return data;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
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
            <span className="text-black">Welcome </span>{" "}
            <span className="text-green-500">Back</span>
          </h1>

          {/* SIGNIN FORM with Formik */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log("Login submitted with:", values);
              /**Sign in with api */
              const data = await handleLogin(values);
              setSubmitting(false);
              /**Reset form after submit */
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div className="">
                  <label
                    htmlFor=""
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
                  {/* ERROR BLOCK */}
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="">
                  <label
                    htmlFor=""
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
                  {/* ERROR BLOCK */}
                  {errors.password && touched.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                {/* SUBMIT BUTTON */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={!isValid || loading || isSubmitting}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:bg-green-300 disabled:cursor-not-allowed `}
                  >
                    {isSubmitting ? "Signing In..." : "Login"}
                  </button>
                </div>
                <p className="mt-6 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-green-500 hover:text-green-600 transition duration-150"
                  >
                    {" "}
                    Sign up
                  </Link>{" "}
                </p>
              </form>
            )}
          </Formik>

          {/* ERROR BLOCK */}
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          {/* <form className="space-y-6">
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Email"
            />

            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Password"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
              >
                Login
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-green-500 hover:text-green-600 transition duration-150"
              >
                {" "}
                Sign up
              </Link>{" "}
            </p>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
