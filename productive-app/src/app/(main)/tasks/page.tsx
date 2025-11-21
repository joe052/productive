"use client";

import React, { useState }  from "react";
import NewTask from "@/components/task/NewTask";
import { taskApi } from "@/lib/services/api";
import TaskList from "@/components/task/TaskList";
import TaskLander from "@/components/task/TaskLander";

/**COMPONENT */
// const Tasks: React.FC = () => {
//   /**VARIABLES */

//   /**FUNCTIONS */

//   /**TEMPLATE */
//   return (
//     <div className="">
//       {/* <TaskLander/> */}
//       <NewTask/>
//       {/* <TaskList /> */}
//     </div>
//   );
// };

const Tasks: React.FC = () => {
  const [open, setOpen] = useState(false); // modal state

  return (
    <div>
      {/* Modal */}
      <NewTask open={open} setOpen={setOpen} />

      {/* Task list with button */}
      <TaskList setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
