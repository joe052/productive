"use client";

import React from "react";
import NewTask from "@/components/task/NewTask";
import { taskApi } from "@/lib/services/api";
import TaskCard from "@/components/task/TaskCard";

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
    <div className="">
      <NewTask />;
      {/* <TaskCard /> */}
    </div>
  );
};

export default Tasks;
