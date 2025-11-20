"use client";

import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

/**COMPONENT */
const LogInForm: React.FC = () => {
  /**VARIABLES */
  const imageContainerStyle = {
    borderTopRightRadius: '60px',
    borderBottomRightRadius: '60px',
    overflow: 'hidden'
  };

  /**FUNCTIONS */
  const LoginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(12, "Password must be at least 12 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log("Form Data:", values);
    },
  })

  /**TEMPLATE */
  return (
    <div className="flex min-h-screen bg-white">
      <div
        className="hidden lg:block lg:w-1/2 relative"
        style={imageContainerStyle}>
        <div
          className="h-full bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage: "url('/images/auth.png')"
          }}
          aria-hidden="true">
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white shadow-lg lg:shadow-none">
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-8"><span className="text-black">Welcome </span> <span className="text-green-500">Back</span></h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-gray-900 bg-white"
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password" 
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-gray-900 bg-white"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="w-full py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:bg-green-300 disabled:cursor-not-allowed disabled:blur-sm"
              >
                Login
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600">Don't have an account?{' '} <Link href="/signup" className="font-medium text-green-500 hover:text-green-600 transition duration-150"> Sign up</Link> </p>
          </form>

          {/* <form className="space-y-6">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-gray-900 bg-white" placeholder="Email"/>

            <label htmlFor="" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-gray-900 bg-white" placeholder="Password"/>
            
            <div className="flex justify-center">
              <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150">
                Login
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600">Don't have an account?{' '} <Link href="/signup" className="font-medium text-green-500 hover:text-green-600 transition duration-150"> Sign up</Link> </p>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
