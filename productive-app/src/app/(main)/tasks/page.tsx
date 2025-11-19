import React from "react";
import NewTask from "@/components/task/NewTask";
import { taskApi } from "@/lib/services/api";
import TaskCard from "@/components/task/TaskCard";
import TaskLander from "@/components/task/TaskLander";

/**COMPONENT */
const Tasks: React.FC = () => {
  /**VARIABLES */

  /**FUNCTIONS */
  
  /**TEMPLATE */
  return (
    <div className="">
      <TaskLander/>;
      {/* <TaskCard /> */}
      {/* <TaskLander /> */}
    </div>
  );
};

export default Tasks;
