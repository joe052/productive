"use client";
import React from "react";


interface Props {
  onClick?: () => void;
}


const NewTaskButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#2DC887] text-white font-bold text-sm px-4 py-2 rounded-md
        shadow-md 
        hover:bg-[#2AB77C] hover:shadow-lg 
        transition-all duration-300
        cursor-pointer
      "
    >
      + New Task
    </button>
  );
};

export default NewTaskButton;
