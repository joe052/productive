"use client";

import React, { useState } from "react";
import NewTask from "@/components/task/NewTask";
import TaskList from "@/components/task/TaskList";

/**COMPONENT */
const Tasks: React.FC = () => {
  /**VARIABLES */
  const [open, setOpen] = useState(false); // modal state
  /**State to track when data should be refreshed */
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  /**FUNCTIONS */
  /**Function to trigger the refresh */
  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  /**TEMPLATE */
  return (
    <div>
      {/* Modal */}
      <NewTask
        open={open}
        setOpen={setOpen}
        onTaskCreated={handleTaskCreated}
      />

      {/* Task list with button */}
      <TaskList setOpen={setOpen} refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default Tasks;
