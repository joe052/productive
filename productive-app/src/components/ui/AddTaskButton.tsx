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
        bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-md
        shadow-md 
        hover:bg-green-700 hover:shadow-lg 
        transition-all duration-300
        cursor-pointer
      "
    >
      + New Task
    </button>
  );
};

export default NewTaskButton;
