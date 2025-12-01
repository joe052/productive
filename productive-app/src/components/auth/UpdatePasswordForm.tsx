"use client";

import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const UpdatePasswordForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    /** Check if session exists immediately on load */
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
         setError("Invalid or expired reset link. Please try again.");
      }
    };
    checkSession();
  }, []);

  const imageContainerStyle = {
    borderTopRightRadius: "60px",
    borderBottomRightRadius: "60px",
    overflow: "hidden",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleUpdatePassword = async (password: string) => {
    setLoading(true);
    setError(null);

    try {
      /** Update the user's password */
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      /** Redirect to login or dashboard after success */
      router.push("/login"); 
      alert("Password updated successfully! Please log in.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden lg:block lg:w-1/2 relative" style={imageContainerStyle}>
        <div
          className="h-full bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: "url('/images/auth.png')" }}
        ></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-8">
            <span className="text-black">Update </span>
            <span className="text-green-500">Password</span>
          </h1>

          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdatePassword(values.password)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className={`rounded-md border ${errors.password && touched.password ? "border-red-500" : "border-gray-300"}`}>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded-md"
                      placeholder="New Password"
                    />
                  </div>
                  {errors.password && touched.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className={`rounded-md border ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-gray-300"}`}>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded-md"
                      placeholder="Confirm Password"
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300 transition"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}
          </Formik>

          {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;