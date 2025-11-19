import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
              Accomplish More with <br />
              <span className="text-emerald-500">Intelligent</span> Task Management
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              Transform your workflow with our intuitive task manager. Stay organized, meet deadlines, and achieve your goals effortlessly.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700"
              >
                Get Started for Free
              </Link>
            </div>
          </div>

          {/* Right Visual - CSS Recreated Cards */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none flex flex-col gap-4">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-center gap-4 transform translate-x-4">
              <div className="bg-emerald-500 rounded-md p-1 text-white">
                <Check size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Complete project proposal</h3>
                <p className="text-xs text-gray-500">Due today • Marketing</p>
              </div>
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">High</span>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-center gap-4 transform -translate-x-2">
              <div className="border-2 border-emerald-500 rounded-md w-7 h-7"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Review design mockups</h3>
                <p className="text-xs text-gray-500">Due tomorrow • Design</p>
              </div>
              <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded-full">Medium</span>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-center gap-4 transform translate-x-2">
              <div className="border-2 border-gray-300 rounded-md w-7 h-7"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Team sync meeting</h3>
                <p className="text-xs text-gray-500">Next week • General</p>
              </div>
              <span className="bg-emerald-100 text-emerald-600 text-xs font-medium px-2.5 py-0.5 rounded-full">Low</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;