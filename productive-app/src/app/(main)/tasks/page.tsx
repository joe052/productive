import React from "react";
import NewTask from "@/components/task/NewTask";
import { taskApi } from "@/lib/services/api";
import TaskList from "@/components/task/TaskList";
import TaskLander from "@/components/task/TaskLander";

/**COMPONENT */
const Tasks: React.FC = () => {
  /**VARIABLES */

  /**FUNCTIONS */

  /**TEMPLATE */
  return (
    <div className="">
      {/* <TaskLander/> */}
      {/* <NewTask/> */}
      <TaskList />
    </div>
  );
};

export default Tasks;
