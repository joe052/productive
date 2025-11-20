"use client";

import React from "react";     
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

/**COMPONENT */
const LogInForm: React.FC = () => {
  /**VARIABLES */
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
            onSubmit={async () => {}}
          >
            {() => (
              <form>
                <div className="">Hey</div>
                <div className="">Hey</div>
              </form>
            )}
          </Formik>

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
