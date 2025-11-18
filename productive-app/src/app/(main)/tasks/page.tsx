"use client";

import { taskApi } from "@/lib/services/api";
import React from "react";

/**COMPONENT */
const Tasks: React.FC = () => {
  /**VARIABLES */

  /**FUNCTIONS */
  const getTasks = async () => {
    const response = await taskApi.get("tasks");
    console.log(response);
    console.log(response.data);
  };

  /**TEMPLATE */
  return (
    <div className="bg-[#808080] flex  h-screen p-4 justify-center items-center">
      <div className="flex flex-col bg-amber-100 p-4 rounded-2xl align">
        <h2 className="text-lg text-black">These are my tasks</h2>
        <button
          onClick={getTasks}
          className="bg-green-500 text-black rounded-[5px] hover:cursor-pointer  hover:bg-green-400"
        >
          Get tasks
        </button>
      </div>
    </div>
  );
};

export default Tasks;
