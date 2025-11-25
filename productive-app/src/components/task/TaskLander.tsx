"use client";

import React, { useState } from "react"; //Added useState import
import NewTask from "./NewTask";

/** COMPONENT */
const tasklander: React.FC = () => {
  /**Add State to manage modal visibility */
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  return (
    <div className="min-h- flex items-center justify-center  p-4">
      <div className="w-full max-w-md p-8  rounded-lg shadow-lg flex flex-col items-center gap-6">
        {/* CALENDER LOGO */}
        <img
          src="/calender.png"
          alt="calender icon"
          className="w-400 h-30 object-contain"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to Productive
        </h1>

        <p className="text-gray-600 text-center">
          Ready to get things rolling?
        </p>

        <p className="text-gray-600 text-center">Add your first task!</p>
        {/* BUTTON - Update onclick handler */}
        <button
          className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={() => setIsNewTaskOpen(true)}
        >
          {" "}
          {/*changed alert to open modal */}
          <span>+</span>
          <span>Add first Task</span>
        </button>
      </div>

      {/*Add newtask modal component */}
      <NewTask open={isNewTaskOpen} setOpen={setIsNewTaskOpen} />
    </div>
  );
};

export default tasklander;
