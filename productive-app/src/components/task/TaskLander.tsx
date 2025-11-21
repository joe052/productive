"use client";

import React from "react";
import NewTask from "./NewTask";
import calendar from "../../app/calender.png";
import TaskCard from "./TaskCard";
import NewTaskButton from "../ui/AddTaskButton";

/** COMPONENT */
const tasklander: React.FC = () => {

  return (
    <div className="min-h- flex items-center justify-center  p-4">
      <div className="w-full max-w-md p-8  rounded-lg shadow-lg flex flex-col items-center gap-6"> 
 
{/* CALENDER LOGO */}

        <img 
          src={calendar.src }
          alt="calender icon"
          className="w-400 h-30 object-contain"/>
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Productive</h1>

        <p className="text-gray-600 text-center">
          Ready to get things rolling?
        </p>

        <p className="text-gray-600 text-center">
          Add your first task!
        </p>
{/* BUTTON  */}
        <button className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2" onClick={() => alert("New Task Button Clicked!")}>
          <span>+</span>
          <span>Add first Task</span>
        </button>
      </div>
    </div>
  );
};

export default tasklander;
