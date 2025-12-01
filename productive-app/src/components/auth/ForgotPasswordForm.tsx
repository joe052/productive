"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/**COMPONENT */
const ForgotPasswordForm: React.FC = () => {
  /**VARIABLES */
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /** Image Styling */
  const imageContainerStyle = {
    borderTopRightRadius: "60px",
    borderBottomRightRadius: "60px",
    overflow: "hidden",
  };

  /**Yup validation schema */
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  /**FUNCTIONS */
  const handleResetRequest = async (email: string) => {
    const supabase = createClient();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
        // redirectTo: 'http://localhost:3000/update-password',
      });

      if (error) throw error;

      /** TRIGGER SUCCESS MODAL */
      setShowSuccessModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  /**TEMPLATE */
  return (
    <div className="flex min-h-screen bg-white">
      {/* Side Image */}
      <div
        className="hidden lg:block lg:w-1/2 relative"
        style={imageContainerStyle}
      >
        <div
          className="h-full bg-cover bg-center shadow-2xl"
          style={{
            // backgroundImage: "url('/images/auth.png')",
            backgroundImage:
              "url('https://res.cloudinary.com/dekilw4yx/image/upload/v1764591087/pasted_file_pnofrk.png')",
          }}
          aria-hidden="true"
        ></div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white shadow-lg lg:shadow-none">
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-black">Forgot </span>
            <span className="text-green-500">Password?</span>
          </h1>
          <p className="text-gray-500 mb-8">
            Enter your email to receive a reset link.
          </p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleResetRequest(values.email)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
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
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded-md placeholder-gray-400"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            )}
          </Formik>

          {/* Error Message (Keep this text-based if API fails) */}
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Remembered it?{" "}
            <Link
              href="/login"
              className="font-medium text-green-500 hover:text-green-600 transition duration-150"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* --- SUCCESS MODAL START --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity">
          {/* Modal Card */}
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 relative text-center transform transition-all scale-100">
            {/* Close Button (Top Right) */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Success Icon (Green Circle with Check) */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Green Filled Circle */}
                  <circle cx="12" cy="12" r="11" fill="#22c55e" />
                  {/* White Checkmark */}
                  <path
                    d="M7 13L10 16L17 9"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Reset Link Sent
            </h2>

            {/* Body Text */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Check your email for the password reset link.
            </p>

            {/* Footer Button */}
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={handleCloseModal}
                className="text-sm text-green-600 font-medium hover:text-green-700 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- SUCCESS MODAL END --- */}
    </div>
  );
};

export default ForgotPasswordForm;
