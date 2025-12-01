"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const ForgotPasswordForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const imageContainerStyle = {
    borderTopRightRadius: "60px",
    borderBottomRightRadius: "60px",
    overflow: "hidden",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleResetRequest = async (email: string) => {
    const supabase = createClient();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      /** Send password reset email */
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setMessage("Check your email for the password reset link.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Side Image */}
      <div className="hidden lg:block lg:w-1/2 relative" style={imageContainerStyle}>
        <div
          className="h-full bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: "url('/images/auth.png')" }}
        ></div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-black">Forgot </span>
            <span className="text-green-500">Password?</span>
          </h1>
          <p className="text-gray-500 mb-8">Enter your email to receive a reset link.</p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleResetRequest(values.email)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className={`rounded-md border ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded-md"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && touched.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300 transition"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            )}
          </Formik>

          {message && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded border border-green-200 text-sm text-center">
              {message}
            </div>
          )}
          {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

          <p className="mt-6 text-center text-sm text-gray-600">
            Remembered it?{" "}
            <Link href="/login" className="font-medium text-green-500 hover:text-green-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;