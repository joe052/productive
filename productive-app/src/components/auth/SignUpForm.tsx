"use client";

import Link from "next/link";
import React from "react";

/**COMPONENT */
const SignUpForm: React.FC = () => {
  /**VARIABLES */
  const imageContainerStyle = {
    borderTopRightRadius: '60px',
    borderBottomRightRadius: '60px',
    overflow: 'hidden'
  };

  /**FUNCTIONS */

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
          <h1 className="text-7xl font-bold mb-8"><span className="text-black">Sign </span> <span className="text-green-500">up</span>
          </h1>
          <form className="space-y-6">
            <label htmlFor="" className="block text-xm font-medium text-gray-700">First Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" placeholder="First Name"/>

            <label htmlFor="" className="block text-xm font-medium text-gray-700">Last Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" placeholder="Last Name"/>

            <label htmlFor="" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" placeholder="Email"/>

            <label htmlFor="" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" placeholder="Password"/>
            
            <div className="flex justify-center">
              <button type="submit" className="py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150">
                Create Account
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-500 hover:text-green-600 transition duration-150">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
