"use client";

import React from "react";
import Link from 'next/link';

/**COMPONENT */
const NewTask: React.FC = () => {
  /**VARIABLES */

  /**FUNCTIONS */

  /**TEMPLATE */
  return (
    <footer className="w-full py-12 bg-[#1c1c1a] text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid justify-between grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Productive</h4>
            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              The smart way to manage your tasks and boost your productivity. Join thousands of professionals who trust Productive to organize their work.
            </p>
          </div>

          {/* Links Section */}
          <div className="">
            <div className="space-y-4">
              <h5 className="font-semibold text-emerald-500">Company</h5>
              <nav className="flex flex-col space-y-3 text-sm text-gray-400">
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default NewTask;
