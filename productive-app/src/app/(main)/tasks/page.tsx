import React from "react";
import NewTask from "@/components/task/NewTask";
import { taskApi } from "@/lib/services/api";
import TaskList from "@/components/task/TaskList";

/**COMPONENT */
const Tasks: React.FC = () => {
  /**VARIABLES */

  /**FUNCTIONS */
  
  /**TEMPLATE */
  return (
    <div className="">
      <TaskList/>
      {/* <TaskCard /> */}
    </div>
  );
};

export default Tasks;
