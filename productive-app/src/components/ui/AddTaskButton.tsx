"use client";
import React from "react";

const NewTaskButton = () => {
  return (
    <button
      onClick={() => alert("New Task Button Clicked!")}
      className="
        bg-[#2AB77C] text-white font-bold text-sm px-4 py-2 rounded-md
        shadow-md 
        hover:bg-[#24a46f] hover:shadow-lg 
        transition-all duration-300
      "
    >
      + New Task
    </button>
  );
};

export default NewTaskButton;
