"use client";

import React from "react";
import NewTask from "@/components/task/NewTask";
import { taskApi } from "@/lib/services/api";
import TaskCard from "@/components/task/TaskCard";

/**COMPONENT */
const Tasks: React.FC = () => {
  /**VARIABLES */

  /**FUNCTIONS */
  
  /**TEMPLATE */
  return (
    <div className="">
      <NewTask />;
      {/* <TaskCard /> */}
    </div>
  );
};

export default Tasks;
